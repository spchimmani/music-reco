import React, { createContext, useState, useEffect } from 'react';

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Test Song',
    artist: 'Test Artist',
    albumArt: 'https://via.placeholder.com/60x60.png?text=Test',
    duration: 180
  });
  const [showQueue, setShowQueue] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reaction, setReaction] = useState('none');
  const [currentTime, setCurrentTime] = useState(0);
  const [queue, setQueue] = useState([
    {
      title: 'Dummy Song 1',
      artist: 'Dummy Artist',
      albumArt: 'https://via.placeholder.com/60x60.png?text=1',
      duration: 200
    },
    {
      title: 'Dummy Song 2',
      artist: 'Dummy Artist',
      albumArt: 'https://via.placeholder.com/60x60.png?text=2',
      duration: 180
    },
    {
      title: 'Dummy Song 3',
      artist: 'Dummy Artist',
      albumArt: 'https://via.placeholder.com/60x60.png?text=3',
      duration: 240
    }
  ]);

  const playTrackWithQueue = (selectedTrack) => {
    setCurrentTrack(selectedTrack);
    setIsPlaying(true);
    setReaction('none');
    setCurrentTime(0);
    setQueue([selectedTrack]); // Replace this with actual queue logic later
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
        showQueue,
        setShowQueue,
        isPlaying,
        setIsPlaying,
        reaction,
        setReaction,
        currentTime,
        setCurrentTime,
        playTrackWithQueue,
        queue,
        setQueue,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};