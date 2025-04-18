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

  const fetchGenreRecommendations = async () => {
    try {
      const genres = ['rnb'];

      const response = await axios.get('http://localhost:8000/coldstart_genre_recommendations', {
        params: { user_genres: genres },
        // Use qs to serialize the params without brackets:
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });

      console.log("Response data:", response.data);
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

      console.log("Response data:", response.data);
      setArtistRecs(response.data.coldstart_artist_recos);
    } catch (error) {
      console.error("Error fetching artist recommendations:", error);
    }
  };

  useEffect(() => {
    // Simulate fetching cold-start recommendations by genre
    fetchGenreRecommendations();
    fetchArtistRecommendations();

    // Simulate fetching cold-start recommendations for top charts
    setTopCharts([
      { id: 1, name: 'Top Song A', image: 'topSongA.jpg' },
      { id: 2, name: 'Top Song B', image: 'topSongB.jpg' },
      { id: 3, name: 'Top Song C', image: 'topSongC.jpg' },
      { id: 4, name: 'Top Song D', image: 'topSongD.jpg' }
    ]);
  }, []);

  return (
    <main className="main-content">
      <section className="cold-start">
        <h2>Top Charts</h2>
        <div className="recommendation-row topcharts-row">
          {topCharts.map((item) => (
            <div key={item.id} className="recommendation-card" onClick={() => playTrackWithQueue(item, topCharts.slice(topCharts.indexOf(item) + 1))}>
              <img src={item.image} alt={item.name} className="recommendation-image" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="cold-start">
        <h2>Genre Recommendations</h2>
        <div className="recommendation-row genre-row">
          {genreRecs.map((item) => (
            <div key={item.id} className="recommendation-card" onClick={() => playTrackWithQueue(item, genreRecs.slice(genreRecs.indexOf(item) + 1))}>
              <img src={item.image} alt={item.name} className="recommendation-image" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="cold-start">
        <h2>Artist Recommendations</h2>
        <div className="recommendation-row artist-row">
          {artistRecs.map((item) => (
            <div key={item.id} className="recommendation-card" onClick={() => playTrackWithQueue(item, artistRecs.slice(artistRecs.indexOf(item) + 1))}>
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