import React, { createContext, useState, useEffect } from 'react';

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Test Song',
    artist: 'Test Artist',
    albumArt: 'https://via.placeholder.com/60x60.png?text=Test',
    duration: 180
  });
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reaction, setReaction] = useState('none');
  const [currentTime, setCurrentTime] = useState(0);

  const playTrackWithQueue = (selectedTrack) => {
    setCurrentTrack(selectedTrack);
    setIsPlaying(true);
    setReaction('none');
    setCurrentTime(0);
  };

  useEffect(() => {
    if (!currentTrack) return;

    let timer;
    if (isPlaying && currentTime < currentTrack.duration) {
      timer = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, currentTrack.duration));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTime, currentTrack]);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        queue,
        setQueue,
        isPlaying,
        setIsPlaying,
        reaction,
        setReaction,
        currentTime,
        setCurrentTime,
        playTrackWithQueue
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};