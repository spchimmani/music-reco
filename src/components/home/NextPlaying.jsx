

import React, { useContext, useEffect } from 'react';
import { MusicPlayerContext } from '../../context/MusicPlayerContext';

const NextPlaying = ({ className }) => {
  const { queue, currentTrack } = useContext(MusicPlayerContext);

  const nextSongs = queue.filter(song => song.title !== currentTrack?.title);

  useEffect(() => {
    // This is where you can add any side effects or data fetching
    // For example, fetching user data or recommendations
    console.log('NextPlaying component mounted');
  }, []);

  return (
    <div className={`next-playing ${className || ''}`} style={styles.sidebar}>
      <h3 style={styles.header}>Up Next</h3>
      <div style={styles.list}>
        {nextSongs.length === 0 ? (
          <p style={styles.empty}>No upcoming songs</p>
        ) : (
          nextSongs.map((song, index) => (
            <div key={index} style={styles.songCard}>
              <img src={song.albumArt} alt={song.title} style={styles.albumArt} />
              <div>
                <div style={styles.songTitle}>{song.title}</div>
                <div style={styles.songArtist}>{song.artist}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#111',
    color: '#fff',
    padding: '10px',
    overflowY: 'auto',
    borderLeft: '1px solid #333',
  },
  header: {
    fontSize: '18px',
    marginBottom: '10px',
    borderBottom: '1px solid #333',
    paddingBottom: '4px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  empty: {
    color: '#aaa',
    fontSize: '14px',
    marginTop: '20px',
  },
  songCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 0',
    borderBottom: '1px solid #222',
  },
  albumArt: {
    width: '40px',
    height: '40px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  songTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: '12px',
    color: '#aaa',
  },
};

export default NextPlaying;