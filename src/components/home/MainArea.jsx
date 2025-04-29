import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import '../../css/home/MainArea.css'; // Optional: separate styling if desired
import { MusicPlayerContext } from '../../context/MusicPlayerContext';
import { track } from 'motion/react-client';

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
      setTopCharts(response.data.tracks);
    } catch (error) {
      console.error("Error fetching user playlist:", error);
      setTopCharts([
        { track_id: "2P3SLxeQHPqh8qKB6gtJY2", name: "Poetic Justice", artist: "Kendrick Lamar", image: "https://i.scdn.co/image/ab67616d0000b273d58e537cea05c2156792c53d", duration: 300160 },
        { track_id: "7so0lgd0zP2Sbgs2d7a1SZ", name: "Die With A Smile", artist: "Lady Gaga", image: "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c", duration: 251667 },
        { track_id: "2RkZ5LkEzeHGRsmDqKwmaJ", name: "Ordinary", artist: "Alex Warren", image: "https://i.scdn.co/image/ab67616d0000b2731648716c6562145bea491cb6", duration: 186964 },
        { track_id: "6dOtVTDdiauQNBQEDOtlAB", name: "BIRDS OF A FEATHER", artist: "Billie Eilish", image: "https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62", duration: 210373 },
        { track_id: "4wJ5Qq0jBN4ajy7ouZIV1c", name: "APT.", artist: "ROSÉ", image: "https://i.scdn.co/image/ab67616d0000b2735074bd0894cb1340b8d8a678", duration: 169917 },
        { track_id: "2CGNAOSuO1MEFCbBRgUzjd", name: "luther (with sza)", artist: "Kendrick Lamar", image: "https://i.scdn.co/image/ab67616d0000b27309d6ed214f03fbb663e46531", duration: 177598 },
        { track_id: "7ne4VBA60CxGM75vw0EYad", name: "That’s So True", artist: "Gracie Abrams", image: "https://i.scdn.co/image/ab67616d0000b2731dac3694b3289cd903cb3acf", duration: 166300 },
        { track_id: "0fK7ie6XwGxQTIkpFoWkd1", name: "like JENNIE", artist: "JENNIE", image: "https://i.scdn.co/image/ab67616d0000b2735a43918ea90bf1e44b7bdcfd", duration: 123517 },
        { track_id: "2262bWmqomIaJXwCRHr13j", name: "Sailor Song", artist: "Gigi Perez", image: "https://i.scdn.co/image/ab67616d0000b273e6065f209e0a01986206bd53", duration: 211978 },
        { track_id: "3xkHsmpQCBMytMJNiDf3Ii", name: "Beautiful Things", artist: "Benson Boone", image: "https://i.scdn.co/image/ab67616d0000b273cc04ff3e70e146ba9abacf40", duration: 180304 },
        { track_id: "6iOndD4OFo7GkaDypWQIou", name: "La Plena - W Sound 05", artist: "W Sound", image: "https://i.scdn.co/image/ab67616d0000b2734740100d84f3667f1eae6870", duration: 150001 },
        { track_id: "35ISBknsCeZQtq66xABI9g", name: "Messy", artist: "Lola Young", image: "https://i.scdn.co/image/ab67616d0000b2736aa2a180c7b009ca8454ef89", duration: 284066 },
        { track_id: "3sK8wGT43QFpWrvNQsrQya", name: "DtMF", artist: "Bad Bunny", image: "https://i.scdn.co/image/ab67616d0000b273bbd45c8d36e0e045ef640411", duration: 237117 },
        { track_id: "2HRqTpkrJO5ggZyyK6NPWz", name: "Espresso", artist: "Sabrina Carpenter", image: "https://i.scdn.co/image/ab67616d0000b273fd8d7a8d96871e791cb1f626", duration: 175459 },
        { track_id: "3LPLRNr58Z9Pn0clnEtkXb", name: "Anxiety", artist: "Doechii", image: "https://i.scdn.co/image/ab67616d0000b273ea29212b801087f18319c187", duration: 249302 },
        { track_id: "3QaPy1KgI7nu9FJEQUgn6h", name: "WILDFLOWER", artist: "Billie Eilish", image: "https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62", duration: 261466 },
        { track_id: "2LHNTC9QZxsL3nWpt8iaSR", name: "Abracadabra", artist: "Lady Gaga", image: "https://i.scdn.co/image/ab67616d0000b273b0860cf0a98e09663c82290c", duration: 223398 },
        { track_id: "2u9S9JJ6hTZS3Vf22HOZKg", name: "NOKIA", artist: "Drake", image: "https://i.scdn.co/image/ab67616d0000b273cc392813bfd8f63d4d5f4a95", duration: 241023 },
        { track_id: "5ceKWhT3J34xxw5uzIzgU9", name: "I Ain't Comin' Back (feat. Post Malone)", artist: "Morgan Wallen", image: "https://i.scdn.co/image/ab67616d0000b273fcd90db6eb97508ab08000ae", duration: 175271 },
        { track_id: "0FIDCNYYjNvPVimz5icugS", name: "Timeless (feat Playboi Carti)", artist: "The Weeknd", image: "https://i.scdn.co/image/ab67616d0000b273982320da137d0de34410df61", duration: 256000 }
      ]);
    }
  };

  const fetchGenreRecommendations = async () => {
    try {
      // get user genres from local storage
      const genres = JSON.parse(localStorage.getItem("userGenres")) || [];
      console.log("User Genres:", genres);
      // const genres = ['rnb'];

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
      // get user artists from local storage
      const artists = JSON.parse(localStorage.getItem("userArtists")) || [];
      console.log("User Artists:", artists);
      // const artists = ['Ed Sheeran'];

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
              track_id: item.track_id,
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