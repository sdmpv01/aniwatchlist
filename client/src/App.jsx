import { useState, useEffect } from "react";
import "./App.css";
import { useRef } from "react";
import StatsPanel from "./StatsPanel";
import MovieCard from "./MovieCard";
import Controls from "./Control";
import AddBar from "./AddBar";
import MovieDetailsModal from "./MovieDetailsModal";

function App() {
  // ================= STATE =================
  const [activeTab, setActiveTab] = useState("Status");
  const [statusTab, setStatusTab] = useState("Watching");

  const [items, setItems] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Movie");
  const [searchQuery, setSearchQuery] = useState("");

  const [showFavorites, setShowFavorites] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const tabs = ["Watching", "Completed", "Plan to Watch", "Dropped"];
  const [loading, setLoading] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [tempDate, setTempDate] = useState("");
  const inputRef = useRef();
  const [message, setMessage] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);

const handleLogin = async () => {
  try {
    const res = await fetch("https://aniwatchlist-backend-yvvu.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "test@gmail.com",
        password: "123456"
      })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } else {
      alert("Login failed");
    }
  } catch (err) {
    console.error(err);
  }
};
  const buttonstyle = {
  background: "#2a2a2a",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  transition: "0.2s"
};
const cardStyle = {
  background: "#1e1e1e",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "15px",
  textAlign: "center",
  transition: "all 0.2s ease",
  cursor: "pointer"
};

const labelStyle = {
  fontSize: "12px",
  color: "#aaa",
  marginBottom: "5px"
};
  // ================= EFFECT =================
useEffect(() => {
  const fetchMovies = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("https://aniwatchlist-backend-yvvu.onrender.com/api/movies", {
        headers: {
          Authorization: token
        }
      });

      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  if (isLoggedIn) {
    fetchMovies();
  }
}, [isLoggedIn]);

  // ================= Debounce =================
  useEffect(() => {
  if (!title.trim()) {
    setSearchResults([]);
    return;
  }

  const timer = setTimeout(() => {
    searchMovies();
  }, 500);

  return () => clearTimeout(timer);
}, [title]);

  // ================= ACTIONS =================
  const deleteItem = async (id) => {
    console.log("DELETE ID:" , id);
    if (!id) return;
  const token = localStorage.getItem("token");

  await fetch(`https://aniwatchlist-backend-yvvu.onrender.com/api/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token
    }
  });

  setItems(items.filter((item) => item._id !== id));
};

const moveItem = async (id, newStatus) => {
  console.log("MOVE ID:" , id);
  if (!id) return;
  const token = localStorage.getItem("token");

  if (newStatus === "Completed") {
    setSelectedItemId(id);
    setTempDate(new Date().toISOString().split("T")[0]);
    setShowDatePopup(true);
    return;
  }

  await fetch(`https://aniwatchlist-backend-yvvu.onrender.com/api/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ status: newStatus })
  });

  setItems(
    items.map((item) =>
      item._id === id ? { ...item, status: newStatus } : item
    )
  );
};
const confirmDate = async () => {
    if (!selectedItemId) return;
  const token = localStorage.getItem("token");

  await fetch(`https://aniwatchlist-backend-yvvu.onrender.com/api/movies/${selectedItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      status: "Completed",
      completedAt: tempDate
    })
  });

  setItems(
    items.map((item) =>
      item._id === selectedItemId
        ? { ...item, status: "Completed", completedAt: tempDate }
        : item
    )
  );

  setShowDatePopup(false);
};

  const updateRating = (id, value) => {
    setItems(
      items.map((item) =>
        item._id === id ? { ...item, rating: value } : item
      )
    );
  };

  const toggleFavorite = (id) => {
    setItems(
      items.map((item) =>
        item._id === id
          ? { ...item, favorite: !item.favorite }
          : item
      )
    );
  };

  // ================= SEARCH =================
  const searchMovies = async () => {
  if (!title.trim()) return;

  setLoading(true); // START loading

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${title}&apikey=52517aa6`
    );
    const data = await response.json();

    setSearchResults(data.Search || []);
  } catch (err) {
    console.error("Search error:", err);
  }

  setLoading(false); // STOP loading
};

  const addItem = () => {
  if (!title.trim()) return;

  // ✅ STEP 1: duplicate check
  const alreadyExists = items.some(
  (item) =>
    item.title.toLowerCase().trim() === title.toLowerCase().trim()
);

  if (alreadyExists) {
    setMessage("Already added!");
    setTimeout(() => setMessage(""), 2000);
    return;
  }

  // ✅ STEP 2: agar duplicate nahi hai tab hi add karo
  const newItem = {
  id: Date.now(),
  title,
  type,
  status: statusTab,
  rating: 0,
  favorite: false,
  completedAt:
    statusTab === "Completed"
      ? new Date().toLocaleDateString()
      : null,
};

  const token = localStorage.getItem("token");

fetch("https://aniwatchlist-backend-yvvu.onrender.com/api/movies", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: token
  },
  body: JSON.stringify(newItem)
})
  .then(res => res.json())
  .then(data => {
    setItems([...items, data]);
  });
  setTitle("");
  inputRef.current.focus();
};

const addFromSearch = async (movie) => {

  // ✅ STEP 1: duplicate check
  const alreadyExists = items.some(
  (item) =>
    item.title.toLowerCase().trim() === movie.Title.toLowerCase().trim()
);

  if (alreadyExists) {
    setMessage("Already added!");
    setTimeout(() => setMessage(""), 2000);
    return;
  }

  // ✅ STEP 2: add only if not duplicate
// STEP 1: default type
let detectedType =
  movie.Type === "series"
    ? "Series"
    : movie.Type === "movie"
    ? "Movie"
    : "Movie";

    let runtime= 0;
// STEP 2: anime detection (ONLY for series)
try {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=52517aa6`
  );
  const data = await res.json();
    runtime =
  data.Runtime && data.Runtime !== "N/A"
    ? parseInt(data.Runtime)
    : 0;
  const genre = data.Genre?.toLowerCase() || "";
  const country = data.Country?.toLowerCase() || "";
  const language = data.Language?.toLowerCase() || "";

  const isAnime =
    genre.includes("animation") &&
    (country.includes("japan") || language.includes("japanese"));

  if (isAnime) {
    detectedType = "Anime";
  }

} catch (err) {
  console.error("Anime detection failed:", err);
}

const newItem = {
  id: Date.now(),
  imdbID: movie.imdbID,
  title: movie.Title,
  type: detectedType,   // ✅ FIXED
  runtime: runtime,
    status: statusTab,
    poster: movie.Poster,
    year: movie.Year,
    rating: 0,
    favorite: false,
    completedAt:
    statusTab === "Completed"
     ? new Date().toLocaleDateString()
    : null,
  };

  const token = localStorage.getItem("token");

fetch("https://aniwatchlist-backend-yvvu.onrender.com/api/movies", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: token
  },
  body: JSON.stringify(newItem)
})
  .then(res => res.json())
  .then(data => {
    setItems([...items, data]);
  });
  inputRef.current.focus();

  // OPTIONAL: remove from search after adding
  setSearchResults((prev) =>
    prev.filter((m) => m.imdbID !== movie.imdbID)
  );
};

  // ================= FILTER + SORT =================
  const filteredItems = items.filter(
    (item) =>
      item.status === statusTab &&
      (!showFavorites || item.favorite) &&
      (filterType === "All" || item.type === filterType) &&
      item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "az") return a.title.localeCompare(b.title);
    return 0;
  });

  // ================= STATS =================
  const total = items.length;
  const watchingCount = items.filter(i => i.status === "Watching").length;
  const completedCount = items.filter(i => i.status === "Completed").length;
  const movieCount = items.filter(i => i.type === "Movie").length;
  const animeCount = items.filter(i => i.type === "Anime").length;
  const seriesCount = items.filter(i => i.type === "Series").length;
  const movieHours = (
  items
    .filter(i => i.type === "Movie")
    .reduce((acc, i) => acc + (i.runtime || 0), 0) / 60
).toFixed(1);

const animeHours = (
  items
    .filter(i => i.type === "Anime")
    .reduce((acc, i) => acc + (i.runtime || 0), 0) / 60
).toFixed(1);

const seriesHours = (
  items
    .filter(i => i.type === "Series")
    .reduce((acc, i) => acc + (i.runtime || 0), 0) / 60
).toFixed(1);
  const totalCount = items.length;
  const typeCountsMap = {
  All: totalCount,
  Movie: movieCount,
  Series: seriesCount,
  Anime: animeCount
};
const baseFilteredItems =
  filterType === "All"
    ? items
    : items.filter(i => i.type === filterType);
const statusCounts = {
  Watching: baseFilteredItems.filter(i => i.status === "Watching").length,
  Completed: baseFilteredItems.filter(i => i.status === "Completed").length,
  "Plan to Watch": baseFilteredItems.filter(i => i.status === "Plan to Watch").length,
  Dropped: baseFilteredItems.filter(i => i.status === "Dropped").length
};

  const avgRating =
  items.length === 0
    ? 0
    : (
        items.reduce((acc, i) => acc + (i.rating || 0), 0) /
        items.length
      ).toFixed(1);

const favoritesCount = items.filter(i => i.favorite).length;

// Most watched type
const typeCounts = {
  Movie: movieCount,
  Anime: animeCount,
  Series: seriesCount
};

const mostWatched = Object.keys(typeCounts).reduce((a, b) =>
  typeCounts[a] > typeCounts[b] ? a : b
);

// Recently completed (last 30 days)
const recentCompleted = items
  .filter(i => i.status === "Completed" && i.completedAt)
  .slice(-3)
  .reverse();

// Completion rate by type
const completionByType = {
  Movie:
    movieCount === 0
      ? 0
      : Math.round(
          (items.filter(i => i.type === "Movie" && i.status === "Completed").length /
            movieCount) *
            100
        ),
  Anime:
    animeCount === 0
      ? 0
      : Math.round(
          (items.filter(i => i.type === "Anime" && i.status === "Completed").length /
            animeCount) *
            100
        ),
  Series:
    seriesCount === 0
      ? 0
      : Math.round(
          (items.filter(i => i.type === "Series" && i.status === "Completed").length /
            seriesCount) *
            100
        )
};
  const completedPercent =
    total === 0 ? 0 : Math.round((completedCount / total) * 100);

  // ================= UI =================
  return (
    <div style={{ fontFamily: "Arial", background: "#121212", color: "white", minHeight: "100vh" }}>

    {/* HEADER */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#1e1e1e",
      borderBottom: "1px solid #333",
      color: "white",
      alignItems: "flex-start",
    }}>
      <div>
      <h2 style={{ margin: 0, 
 fontSize: "24px",
fontWeight: "700", 
  marginBottom: "5px",
letterSpacing: "0.5px" }}>
        🎬 AniWatchList
      </h2>
<p style={{ 
  fontSize: "12px", 
  color: "#888", 
  marginTop: "2px" 
}}>
  Track your movies, series & anime
</p></div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button 
        onClick={handleLogin}
        style={{ ...buttonstyle, padding: "8px 12px", background: "#107C10", color: "white", border: "none", borderRadius: "5px" }}>
          Login
        </button>
        <button style={{ ...buttonstyle,  padding: "8px 12px", background: "#107C10", color: "white", border: "none", borderRadius: "5px" }}>
          Signup
        </button>
        {isLoggedIn && (
  <button
    onClick={() => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }}
    style={{
      ...buttonstyle,
      padding: "8px 12px",
      background: "#b91c1c"
    }}
  >
    Logout
  </button>
)}
      </div>
    </div>
{/* MAIN CONTAINER */}
{isLoggedIn ? (

<div style={{
          maxWidth: "1100px",
          margin: "20px auto",
          padding: "20px",
          background: "#181818",
          borderRadius: "12px"
        }}>
{/* MAIN TABS */}
<div style={{ marginTop: "10px", marginBottom: "20px" , borderTop: "1px solid #333", paddingTop: "10px",}}>
  <div style={{ display: "flex", gap: "20px", fontSize: "16px" }}>
    
    <span
      onClick={() => setActiveTab("Status")}
      style={{
        cursor: "pointer",
        borderBottom: activeTab === "Status" ? "2px solid #107C10" : "none",
        paddingBottom: "5px"
      }}
    >
      Status
    </span>

    <span
      onClick={() => setActiveTab("Statistics")}
      style={{
        cursor: "pointer",
        borderBottom: activeTab === "Statistics" ? "2px solid #107C10" : "none",
        paddingBottom: "5px"
      }}
    >
      Statistics
    </span>

  </div>
</div>

      {/* Stats */}
      {activeTab === "Statistics" && (
        <StatsPanel 
          
          total={total}
          watchingCount={watchingCount}
          completedCount={completedCount}
          avgRating={avgRating}
          favoritesCount={favoritesCount}
          mostWatched={mostWatched}
          completionByType={completionByType}
          recentCompleted={recentCompleted}
          completedPercent={completedPercent}
          movieHours={movieHours}
  animeHours={animeHours}
  seriesHours={seriesHours}
        />
      )}

      {activeTab === "Status" && (
      <>
      {/* TYPE FILTER TABS */}
<div style={{ 
  display: "flex", 
  gap: "10px", 
  marginBottom: "12px",
  flexWrap: "wrap"
}}>
  {["All", "Movie", "Series", "Anime"].map((type) => (
    <button
      key={type}
      onClick={() => setFilterType(type)}
      style={{
  ...buttonstyle,
  padding: "6px 14px",
  borderRadius: "20px",
  background: filterType === type ? "#16a34a" : "#2a2a2a",
  color: "white",
  fontSize: "12px",
  fontWeight: filterType === type ? "600" : "400",
  border: filterType === type ? "1px solid #16a34a" : "1px solid #333",
  transition: "0.2s"
}}
    >
      {type} ({typeCountsMap[type]})
    </button>
  ))}
</div>
      <div style={{ marginBottom: "5px" }}></div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px", borderTop: "1px solid #333", paddingTop: "8px", }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusTab(tab)}
            style={{
              ...buttonstyle, 
              padding: "8px 14px",
              fontSize: "14px",
              background: statusTab === tab ? "#16a34a" : "#2a2a2a",
color: "white",
fontWeight: statusTab === tab ? "600" : "400",
border: statusTab === tab ? "1px solid #16a34a" : "1px solid #333",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer"
              
            }}
          >
            {tab} ({statusCounts[tab]})
          </button>
        ))}
      </div>

      {/* CONTROLS BAR */}
<Controls
  showFavorites={showFavorites}
  setShowFavorites={setShowFavorites}
  filterType={filterType}
  setFilterType={setFilterType}
  sortBy={sortBy}
  setSortBy={setSortBy}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  buttonstyle={buttonstyle}
  message={message}
/>
      {/* ADD BAR */}
<AddBar
  title={title}
  setTitle={setTitle}
  type={type}
  setType={setType}
  addItem={addItem}
  searchMovies={searchMovies}
  inputRef={inputRef}
  buttonstyle={buttonstyle}
/>
      {/* Search Results */}
      <div style={{ marginBottom: "20px" }}>
  {loading ? (
    <div className="spinner"></div>
  ) : (
    searchResults.map((movie) => (
  <div
    key={movie.imdbID}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#2a2a2a")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "#1e1e1e")}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px",
      marginBottom: "10px",
      background: "#1e1e1e",
      border: "1px solid #333",
      transition: "0.2s",
      cursor: "pointer",
      borderRadius: "8px"
    }}
  >
    <img
      src={movie.Poster !== "N/A" ? movie.Poster : ""}
      style={{
        width: "50px",
        height: "75px",
        objectFit: "cover",
        borderRadius: "4px"
      }}
    />

    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "14px", fontWeight: "bold" }}>
        {movie.Title}
      </div>
      <div style={{ fontSize: "12px", color: "#aaa" }}>
        {movie.Year}
      </div>
    </div>

    <button
      onClick={() => addFromSearch(movie)}
      onMouseEnter={(e) => (e.target.style.background = "#3a3a3a")}
      onMouseLeave={(e) => (e.target.style.background = "#2a2a2a")}
      style={{
        ...buttonstyle, 
        background: "#107C10",
        color: "white",
        border: "none",
        transition: "0.2s",
        padding: "6px 10px",
        borderRadius: "5px",
        cursor: "pointer"
        
      }}
    >
      Add
    </button>
  </div>
))
  )}
</div>

      {/* List */}
      <h2>{statusTab}</h2>

      {sortedItems.length === 0 ? (
        <p style={{ opacity: 0.6 }}>
              <div style={{
                textAlign: "center",
                padding: "40px 0",
                opacity: 0.7
              }}>
                <div style={{ textAlign: "center", color: "#988", fontSize: "40px", marginTop: "20px" }}>🎬</div>
                <p style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
                  Nothing here yet.<br />
                  Start adding your watchlist 🚀
                </p>
              </div>
        </p>
      ) : (
        <div style={{ columnCount: 2, columnGap: "20px" }}>
        {sortedItems.map((item) => (
              <MovieCard
              key={item._id}
            item={item}
            deleteItem={deleteItem}
            moveItem={moveItem}
            toggleFavorite={toggleFavorite}
            updateRating={updateRating}
            tabs={tabs}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            buttonstyle={buttonstyle}
            setSelectedMovie={setSelectedMovie}
          />
        ))}
        </div>
      )}
      {showDatePopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        background: "#1e1e1e",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Select Completion Date</h3>

      <input
              style={{
        background: "#2a2a2a",
        color: "white",
        border: "1px solid #444",
        padding: "6px"
        }}
        type="date"
        value={tempDate}
        onChange={(e) => setTempDate(e.target.value)}
      />

      <div style={{ marginTop: "15px",borderTop: "1px solid #333", paddingTop: "10px", }}>
        <button onClick={confirmDate} style = {{...buttonstyle}}>Save</button>
        <button onClick={() => setShowDatePopup(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
 </>
)}  
{selectedMovie && (
  <MovieDetailsModal
    movie={selectedMovie}
    onClose={() => setSelectedMovie(null)}
  />
)}

</div> //Close Main Container

) : (

  <div style={{
    textAlign: "center",
    marginTop: "100px"
  }}>
    <h2>Please Login to Continue</h2>

    <button
      onClick={handleLogin}
      style={{
        ...buttonstyle,
        padding: "10px 20px",
        background: "#107C10",
        marginTop: "20px"
      }}
    >
      Login
    </button>
  </div>

)}
    </div>
  );
}

export default App;