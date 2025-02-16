import React, { useState } from "react";
import "../css/SearchPage.css"; // External CSS file for styling
import axios from "axios";
const SearchPage = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSearch = async () => {
    if (name.trim() === "") {
      setImageUrl("");
      return;
    }
    // Simulating fetching an image from an API (replace with real API call)
      // write get api call to fast api server
      
    try {
    const response = await axios.get(`http://localhost:8000/artists/${name}`);
    setImageUrl(response.data.image_url);  // Ensure backend sends { image_url: "..." }
    } catch (error) {
    console.error("Error fetching image:", error);
    setImageUrl(""); // Reset image on error
    }
  };

  return (
    <div className="search-container">
      <h2>Search for a Person</h2>
      <input
        type="text"
        placeholder="Enter a name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>

      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="Person" className="circular-image" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;