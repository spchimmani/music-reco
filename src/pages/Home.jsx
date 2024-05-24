// src/pages/Home.js

import React from 'react';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to My Music App</h1>
        <nav className="nav">
          <a href="#discover">Discover</a>
          <a href="#top-charts">Top Charts</a>
          <a href="#genres">Genres</a>
          <a href="#playlists">Playlists</a>
        </nav>
      </header>
      <main className="main-content">
        <section id="discover">
          <h2>Discover New Music</h2>
          <p>Explore new songs and artists recommended just for you.</p>
        </section>
        <section id="top-charts">
          <h2>Top Charts</h2>
          <p>Check out the latest hits and trending music.</p>
        </section>
        <section id="genres">
          <h2>Genres</h2>
          <p>Browse music by your favorite genres.</p>
        </section>
        <section id="playlists">
          <h2>Playlists</h2>
          <p>Create and manage your own playlists.</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 My Music App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
