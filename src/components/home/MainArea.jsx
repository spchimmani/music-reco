import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import '../../css/home/MainArea.css'; // Optional: separate styling if desired
import { MusicPlayerContext } from '../../context/MusicPlayerContext';

const MainArea = () => {
  const [genreRecs, setGenreRecs] = useState([]);
  const [artistRecs, setArtistRecs] = useState([]);
  const [topCharts, setTopCharts] = useState([]);
  const { playTrackWithQueue } = useContext(MusicPlayerContext);

  // Fetch user playlist data
  const fetchUserPlaylist = async () => {
    try {
      const access_token = localStorage.getItem("access_token"); // or wherever you stored it after login

      const response = await axios.get('http://localhost:8000/myplaylist', {
        params: { access_token }
      });
      console.log("User Playlist data:", response.data);
      // Process the user playlist data as needed
      // if response.data results in error then handle it
      if (response.data.error) {
        console.error("Error fetching user playlist:", response.data.error);
        // Handle the error accordingly
      } else {
        setTopCharts(response.data.tracks); // Assuming the response contains the playlist data
      }
    } catch (error) {
      console.error("Error fetching user playlist:", error);
    }
  };

  const fetchGenreRecommendations = async () => {
    try {
      const genres = ['rnb'];

      const response = await axios.get('http://localhost:8000/coldstart_genre_recommendations', {
        params: { user_genres: genres },
        // Use qs to serialize the params without brackets:
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });

      console.log("Genre Response data:", response.data);
      setGenreRecs(response.data.coldstart_genre_recos);
    } catch (error) {
      console.error("Error fetching genre recommendations:", error);
    }
  };

  const fetchArtistRecommendations = async () => {
    try {
      const artists = ['Ed Sheeran'];

      const response = await axios.get('http://localhost:8000/coldstart_artist_recommendations', {
        params: { user_artists: artists },
        // Use qs to serialize the params without brackets:
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });

      console.log("Artist Response data:", response.data);
      setArtistRecs(response.data.coldstart_artist_recos);
    } catch (error) {
      console.error("Error fetching artist recommendations:", error);
    }
  };

  useEffect(() => {
    // Simulate fetching cold-start recommendations by genre
    fetchUserPlaylist();
    fetchGenreRecommendations();
    fetchArtistRecommendations();
  }, []);

  return (
    <main className="main-content" style={{ flex: 1 }}>
      <section className="cold-start">
        <h2>Top Charts</h2>
        <div className="recommendation-row topcharts-row">
          {topCharts.map((item, index) => (
            <div key={item.id || `top-${index}`} className="recommendation-card" onClick={() => playTrackWithQueue({
              title: item.name,
              artist: item.artist || 'Unknown Artist',
              albumArt: item.image,
              duration: item.duration || 180
            })}>
              <img src={item.image} alt={item.name} className="recommendation-image" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>
 
      <section className="cold-start">
        <h2>Genre Recommendations</h2>
        <div className="recommendation-row genre-row">
          {genreRecs.map((item, index) => (
            <div key={item.id || `genre-${index}`} className="recommendation-card" onClick={() => playTrackWithQueue({
              title: item.name,
              artist: item.artist || 'Unknown Artist',
              albumArt: item.image,
              duration: item.duration || 180
            })}>
              <img src={item.image} alt={item.name} className="recommendation-image" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>
 
      <section className="cold-start">
        <h2>Artist Recommendations</h2>
        <div className="recommendation-row artist-row">
          {artistRecs.map((item, index) => (
            <div key={item.id || `artist-${index}`} className="recommendation-card" onClick={() => playTrackWithQueue({
              title: item.name,
              artist: item.artist || 'Unknown Artist',
              albumArt: item.image,
              duration: item.duration || 180
            })}>
              <img src={item.image} alt={item.name} className="recommendation-image" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainArea;