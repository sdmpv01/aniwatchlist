function AddBar({
  title,
  setTitle,
  type,
  setType,
  addItem,
  searchMovies,
  inputRef,
  buttonstyle
}) {
  return (
    <div>
      <div style={{
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap"
}}>
        <input
                style={{
        background: "#2a2a2a",
        color: "white",
        border: "1px solid #444",
        padding: "6px",
        flex: "1",
        minWidth: "200px"
        }}
          ref={inputRef}  
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={type} style={{
          background: "#2a2a2a",
          color: "white",
          border: "1px solid #444",
          padding: "6px"
        }}
        onChange={(e) => setType(e.target.value)}>
          <option>Movie</option>
          <option>Anime</option>
          <option>Series</option>
        </select>
        
          <button
            onClick={addItem}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            style={{
              ...buttonstyle, 
              transform: "scale(1)",
              transition: "0.1s"
              
            }}
          >Add</button>
        <button onClick={searchMovies}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            style={{
              ...buttonstyle, 
              transform: "scale(1)",
              transition: "0.1s"
            }}
              >Search</button>
      </div>

    </div>
  );
}

export default AddBar;