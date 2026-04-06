function StatsPanel({
  total,
  watchingCount,
  completedCount,
  avgRating,
  favoritesCount,
  mostWatched,
  completionByType,
  recentCompleted,
  completedPercent,
  movieHours,
animeHours,
    seriesHours,
}) 
{
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
  return (
    <div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h3>📊 Stats</h3>
        <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "10px",
              marginTop: "10px"
          }}
          >
        

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
    <p style={labelStyle}>Total</p>
    <h3 style={{ color: "#00ff88" }}>{total}</h3>
  </div>

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
    <p style={labelStyle}>Watching</p>
    <h3 style={{ color: "#4da6ff" }}>{watchingCount}</h3>
  </div>

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
    <p style={labelStyle}>Completed</p>
    <h3 style={{ color: "#ffd700" }}>{completedCount}</h3>
  </div>

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
    <p style={labelStyle}>Avg Rating</p>
    <h3 style={{ color: "#ffb347" }}>{avgRating}</h3>
  </div>

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
    <p style={labelStyle}>Favorites</p>
    <h3 style={{ color: "#ff4d6d" }}>{favoritesCount}</h3>
  </div>

          <div
  style={{ ...cardStyle, gridColumn: "span 2" }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  <p style={labelStyle}>Top Type</p>
  <h3 style={{ color: "#c084fc" }}>{mostWatched}</h3>
</div>
        </div>
<h4 style={{ marginTop: "20px", textAlign: "left" }}>
  Hours Watched
</h4>

<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "10px",
  marginTop: "10px"
}}>
    <div style={cardStyle}>
  <p style={labelStyle}>Movies</p>
  <h3 style={{ color: "#00ff88" }}>{movieHours} hrs</h3>
</div>

<div style={cardStyle}>
  <p style={labelStyle}>Anime</p>
  <h3 style={{ color: "#ff4d6d" }}>{animeHours} hrs</h3>
</div>

<div style={cardStyle}>
  <p style={labelStyle}>Series</p>
  <h3 style={{ color: "#4da6ff" }}>{seriesHours} hrs</h3>
</div>
</div>


<h4 style={{ marginTop: "20px", textAlign: "left" }}>
  Completion by Type
</h4>

<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "10px",
  marginTop: "10px"
}}>
  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
    <p style={labelStyle}>Movies</p>
    <h3 style={{ color: "#00ff88" }}>{completionByType.Movie}%</h3>
  </div>

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
    <p style={labelStyle}>Anime</p>
    <h3 style={{ color: "#ff4d6d" }}>{completionByType.Anime}%</h3>
  </div>

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
    <p style={labelStyle}>Series</p>
    <h3 style={{ color: "#4da6ff" }}>{completionByType.Series}%</h3>
  </div>
</div>

<div style={{ marginTop: "20px", textAlign: "left" }}>
  <h4>Recently Completed</h4>

  <div style={{
    background: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "10px"
  }}>
    {recentCompleted.length === 0 ? (
      <p style={{ opacity: 0.6 }}>No recent completions</p>
    ) : (
      recentCompleted.map((item, index) => (
        <div
          key={item.id}
          style={{
            padding: "6px 0",
            borderBottom:
              index !== recentCompleted.length - 1
                ? "1px solid #333"
            : "none",
            fontSize: "13px"
          }}
        >
          ✔ {item.title}
        </div>
      ))
    )}
  </div>
</div>
        <div style={{ marginTop: "20px" }}>
  <p style={{ marginBottom: "8px", textAlign: "left" }}>
  Progress: {completedPercent}%
</p>

  <div style={{
    height: "8px",
    background: "#2a2a2a",
    borderRadius: "10px",
    overflow: "hidden"
  }}>
    <div
      style={{
        height: "100%",
        width: `${completedPercent}%`,
        background: "linear-gradient(90deg, #107C10, #00ff88)",
        transition: "0.3s"
      }}
    />
  </div>
</div>
</div>
    </div>
  );
}

export default StatsPanel;