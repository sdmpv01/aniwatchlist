import { useEffect, useState } from "react";

function MovieDetailsModal({ movie, onClose }) {
    const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modalStyle = {
    animation: "fadeIn 0.3s ease",
  background: "#1e1e1e",
  padding: "20px",
  borderRadius: "12px",
  width: "700px",
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
  border: "1px solid #2a2a2a",
};
const fadeStyle = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "150px 1fr",
  gridTemplateRows: "auto auto",
  gap: "20px",
  marginTop: "15px"
};

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
  try {
    console.log("Fetching for:", movie);

    const res = await fetch(
      `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=52517aa6`
    );

    const data = await res.json();

    console.log("API RESPONSE:", data);

    if (data.Response === "False") {
      console.log("API Error:", data.Error);
      setDetails({ error: true });
      return;
    }

    setDetails(data);
  } catch (err) {
    console.error("Fetch error:", err);
    setDetails({ error: true });
  }
};

    if (movie?.imdbID) {
      fetchDetails();
    }
  }, [movie]);

if (details?.error) {
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: "right" }}>
          <button
  onClick={onClose}
  onMouseEnter={(e) => (e.target.style.color = "#ff4d4d")}
  onMouseLeave={(e) => (e.target.style.color = "white")}
  style={{
    background: "none",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer"
  }}
>❌</button>
        </div>

        <p>Failed to load details</p>
      </div>
    </div>
  );
}


if (!details) {
  return (
    <div style={overlayStyle}
        onClick={onClose}>
      <div style={modalStyle}
        onClick={(e) => e.stopPropagation()}>

        {/* CLOSE BUTTON */}
        <div style={{ textAlign: "right" }}>
          <button
              onClick={onClose}
              onMouseEnter={(e) => (e.target.style.color = "#ff4d4d")}
            onMouseLeave={(e) => (e.target.style.color = "white")}>❌</button>
        </div>

        <p>Loading...</p>

      </div>
    </div>
  );
}
  

  return (
  <>
    <style>{fadeStyle}</style>

    <div style={overlayStyle} onClick={onClose}>
      <div
  style={modalStyle}
  onClick={(e) => e.stopPropagation()}
>

        {/* CLOSE */}
        <div style={{ textAlign: "right" }}>
          <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              ✖
            </button>
        </div>
  {/* Title */}
            <h2
              style={{
                marginBottom: "8px",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "600"
              }}
            >
                {details.Title}
            </h2>
<hr style={{ border: "1px solid #333", margin: "15px 0" }} />
{/* GENRE BADGES */}
<div style={{ marginBottom: "10px" }}>
  {details.Genre &&
    details.Genre.split(",").map((g, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          background: "#2a2a2a",
          padding: "4px 8px",
          borderRadius: "6px",
          fontSize: "11px",
          marginRight: "6px",
          color: "#ccc"
        }}
      >
        {g.trim()}
      </span>
    ))}
</div>
<hr style={{ border: "1px solid #333", margin: "15px 0" }} />
        {/* GRID */}
        <div style={gridStyle}>

          {/* Poster */}
          <img
              src={details.Poster !== "N/A" ? details.Poster : ""}
              style={{
                width: "150px",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #333",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
              }}
              
            />

          {/* Plot */}
          <div style={{
  background: "#181818",
  padding: "10px",
  borderRadius: "8px"
}}>
  <h3 style={{ marginBottom: "8px", color: "#ddd" }}>
    📖 Summary
  </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#b3b3b3" }}>
                {details.Plot || "Not available"}
              </p>
            </div>

          {/* Cast */}
          <div style={{
  background: "#181818",
  padding: "10px",
  borderRadius: "8px"
}}>
              <h3 style={{ marginBottom: "8px" }}>🎭 Cast</h3>
              <p style={{ fontSize: "13px", color: "#ddd" }}>
                {details.Actors
                ? details.Actors.split(",").slice(0, 3).join(", ")
                : "Not available"}
              </p>
            
              <p style={{ marginTop: "6px", fontSize: "12px", color: "#aaa" }}>
                🎬 Directed by: {details.Director || "N/A"}
              </p>
            </div>

          {/* Ratings */}
            <div style={{
  background: "#181818",
  padding: "10px",
  borderRadius: "8px"
}}>
              <h3 style={{ marginBottom: "8px" }}>ℹ️ Info</h3>

              <p style={{ fontSize: "15px" }}>
                ⭐ IMDB: <span style={{ color: "#ffd700" }}>
                  {details.imdbRating || "N/A"}
                </span>
              </p>

              <p style={{ fontSize: "15px", marginTop: "5px" }}>
                📅 Released: {details.Released || "N/A"}
              </p>

              <p style={{ fontSize: "14px", marginTop: "5px", color: "#aaa" }}>
                ⏱ Runtime: {details.Runtime || "N/A"}
              </p>
            </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default MovieDetailsModal;