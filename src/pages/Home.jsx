// src/pages/Home.jsx
import React, { useContext } from 'react';
import TopBar from '../components/home/TopBar';
import SideBar from '../components/home/SideBar';
import MainArea from '../components/home/MainArea';
import Footer from '../components/home/Footer';
import '../css/Home.css'; // Central CSS for global layout if needed
import { useEffect } from 'react';
import NextPlaying from '../components/home/NextPlaying'; // Import NextPlaying component
import { MusicPlayerContext } from '../context/MusicPlayerContext'; // Import context
const Home = () => {
  const {showQueue} = useContext(MusicPlayerContext);
  useEffect(() => {
    // This is where you can add any side effects or data fetching
    // For example, fetching user data or recommendations
    console.log('Home component mounted');
  }, []);
  return (
    <div className="home-page">
      <TopBar />
      
      {/* Content Wrapper to hold Sidebar and Main Content side-by-side */}
      <div className="content-wrapper">
        <SideBar />
        <MainArea />
        <NextPlaying className={`next-playing ${showQueue ? 'show' : ''}`} />      </div>
      <Footer />
    </div>
  );
};

export default Home;