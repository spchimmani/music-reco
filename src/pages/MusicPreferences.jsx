// src/pages/MusicPreferences.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Reusing the same styles for consistency

const genres = ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "EDM", "R&B", "Country"];
const artists = ["Taylor Swift", "Drake", "The Beatles", "Eminem", "BTS", "Billie Eilish"];
const moods = ["Relaxing", "Energetic", "Happy", "Sad", "Workout", "Focus"];

const MusicPreferences = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const navigate = useNavigate();

  const handleSelection = (category, value) => {
    let setFunction =
      category === "genres" ? setSelectedGenres :
      category === "artists" ? setSelectedArtists :
      setSelectedMoods;

    setFunction((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    console.log("User Preferences:", { selectedGenres, selectedArtists, selectedMoods });
    // Save preferences to backend (to be implemented)
    navigate("/dashboard"); // Redirect to the next step in the app
  };

  return (
    <div className="login-page"> 
      <div className="login-container">
        <h1 className="login-heading">Tell Us About Your Music Taste</h1>
        
        <h3>Favorite Genres</h3>
        <div className="checkbox-group">
          {genres.map((genre) => (
            <label key={genre} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleSelection("genres", genre)}
              />
              {genre}
            </label>
          ))}
        </div>

        <h3>Favorite Artists</h3>
        <div className="checkbox-group">
          {artists.map((artist) => (
            <label key={artist} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedArtists.includes(artist)}
                onChange={() => handleSelection("artists", artist)}
              />
              {artist}
            </label>
          ))}
        </div>

        <h3>Preferred Moods</h3>
        <div className="checkbox-group">
          {moods.map((mood) => (
            <label key={mood} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedMoods.includes(mood)}
                onChange={() => handleSelection("moods", mood)}
              />
              {mood}
            </label>
          ))}
        </div>

        <button onClick={handleSubmit}>Save & Continue</button>
      </div>
    </div>
  );
};

export default MusicPreferences;