function Controls({
  showFavorites,
  setShowFavorites,
  filterType,
  setFilterType,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  buttonstyle,
  message
}) {
  return (
    <div>
      <div style={{
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
  flexWrap: "wrap"
}}>

  <button
    onClick={() => setShowFavorites(!showFavorites)}
    style={{
      ...buttonstyle, 
      background: showFavorites ? "#107C10" : "#2a2a2a",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "5px",
      cursor: "pointer"
      
    }}
  >
    ❤️ Only Favorites
  </button>

  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
    style={{
      background: "#2a2a2a",
      color: "white",
      border: "1px solid #444",
      padding: "6px"
    }}
  >
    <option value="All">All</option>
    <option value="Movie">Movie</option>
    <option value="Anime">Anime</option>
    <option value="Series">Series</option>
  </select>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    style={{
      background: "#2a2a2a",
      color: "white",
      border: "1px solid #444",
      padding: "6px"
    }}
  >
    <option value="latest">Latest</option>
    <option value="oldest">Oldest</option>
    <option value="rating">Rating</option>
    <option value="az">A-Z</option>
  </select>

  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{
      background: "#2a2a2a",
      color: "white",
      border: "1px solid #444",
      padding: "6px",
      flex: "1",
      minWidth: "150px"
    }}
  />

  <button
    onClick={() => setSearchQuery("")}
    onMouseEnter={(e) => (e.target.style.background = "#3a3a3a")}
    onMouseLeave={(e) => (e.target.style.background = "#2a2a2a")}
    style={{
      ...buttonstyle, 
      background: "#444",
      color: "white",
      border: "none",
      transition: "0.2s",
      padding: "6px 10px",
      borderRadius: "5px",
      cursor: "pointer"
      
    }}
  >
    Clear
  </button>

</div>
{message && (
  <div
    style={{
      marginBottom: "10px",
      padding: "8px",
      background: "#b00020",
      color: "white",
      borderRadius: "5px",
      fontSize: "13px"
    }}
  >
    {message}
  </div>
)}
    </div>
  );
}

export default Controls;