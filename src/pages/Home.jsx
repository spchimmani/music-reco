// src/pages/Home.jsx
import React from 'react';
import TopBar from '../components/home/TopBar';
import SideBar from '../components/home/SideBar';
import MainArea from '../components/home/MainArea';
import Footer from '../components/home/Footer';
import '../css/Home.css'; // Central CSS for global layout if needed
import { useEffect } from 'react';

const Home = () => {
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
      </div>

      <Footer />
    </div>
  );
};

export default Home;