function MovieCard({
  item,
  deleteItem,
  moveItem,
  toggleFavorite,
  updateRating,
  tabs,
  hoveredId,
  setHoveredId,
  buttonstyle,
  setSelectedMovie
}) {
  return (
    <div>
      <div
                onClick={() => {
                console.log("CLICK WORKING", item);
                setSelectedMovie(item);
                }}
                onMouseEnter={() => setHoveredId(item._id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  breakInside: "avoid",
                  marginBottom: "15px",
                  padding: "16px",
                  borderRadius: "12px",
                  backgroundColor: "#1e1e1e",
                  border:
                      hoveredId === item._id
                        ? "1px solid #555"
                    : "1px solid #333",
                  transform: hoveredId === item._id 
                      ? "translateY(-4px) scale(1.02)" 
                    : "scale(1)",
                  boxShadow:
                    hoveredId === item._id
                  ? "0 4px 15px rgba(0,0,0,0.4)"
                  : "none",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  cursor: "pointer"
                }}
              >
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <img
                  src={item.poster && item.poster !== "N/A" ? item.poster : ""}
                  style={{
                  width: "90px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "5px"
                }}
                />

              <div style={{ flex: 1 }}>
                <div style={{ 
  fontSize: "15px",
  fontWeight: "600",
  lineHeight: "1.3",
  display: "flex",
  alignItems: "center",
  gap: "6px"
}}>
  {item.title}

  <span
    style={{
      fontSize: "10px",
      padding: "2px 6px",
      borderRadius: "5px",
      background:
        item.type === "Anime"
          ? "#8b5cf6"
          : item.type === "Series"
          ? "#3b82f6"
          : "#10b981",
      color: "white"
    }}
  >
    {item.type}
  </span>
</div>

                <div style={{ fontSize: "12px", color: "#aaa" }}>
                  {item.year} 
                </div>

                  {item.completedAt && (
                    <p style={{ fontSize: "12px", color: "gray" }}>
                    Watched on: {item.completedAt}
                    </p>
                  )}
                <button
                  onClick={(e) => {
                  e.stopPropagation();  toggleFavorite(item._id)}}
                  style={{
                    
                    marginTop: "2px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "25px",
                    color: item.favorite ? "red" : "#777"
                  
                }}
                >
                  ♥
                </button>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ marginBottom: "5px" }}>⭐</div>
                  <select
                  value={item.rating || 0}
                            onClick={(e) => e.stopPropagation()}   // ✅ ADD THIS
                              onChange={(e) => {
                                e.stopPropagation();                 // ✅ ADD THIS
                            updateRating(item._id, Number(e.target.value));
                        }}
                        >
                  <option value="0">Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px"
              }}>
              {tabs
                .filter((tab) => tab !== item.status)
                .map((tab) => (
                  <button
                    key={tab}
                    onClick={(e) => {
                    e.stopPropagation(); 
                    moveItem(item._id, tab)}}
                    onMouseEnter={(e) => (e.target.style.background = "#3a3a3a")}
                    onMouseLeave={(e) => (e.target.style.background = "#2a2a2a")}
                    style={{
                      ...buttonstyle, 
                      background: "#2a2a2a",
                      color: "white",
                      border: "none",
                      transition: "0.2s",
                      padding: "5px 8px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "12px"
                      
                    }}
                  >
                    {tab === "Plan to Watch" ? "PTW" : tab}
                  </button>
                ))}

              <button
                  onClick={(e) => {
                  e.stopPropagation(); 
                  deleteItem(item._id)}}
                  onMouseEnter={(e) => (e.target.style.background = "#3a3a3a")}
                  onMouseLeave={(e) => (e.target.style.background = "#2a2a2a")}
                  style={{
                    ...buttonstyle, 
                    background: "#b00020",
                    color: "white",
                    border: "none",
                    transition: "0.2s",
                    padding: "5px 8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "12px"
                    
                  }}
                >
                  Delete
                </button>
            </div>
          </div>
    </div>
  );
}

export default MovieCard;