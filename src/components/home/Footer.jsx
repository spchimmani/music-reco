import React, { useEffect, useContext } from 'react';
import { MusicPlayerContext } from '../../context/MusicPlayerContext';

function ModernMusicFooter() {
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    reaction,
    setReaction,
    currentTime,
    setCurrentTime,
    showQueue,
    setShowQueue,
  } = useContext(MusicPlayerContext);


  // Toggle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Dummy handlers for skipping
  const handlePrev = () => {
    console.log('Prev Track');
    // Reset reaction on track change if needed
    setReaction('none');
  };

  const handleNext = () => {
    console.log('Next Track');
    // Reset reaction on track change if needed
    setReaction('none');
  };

  // Reaction handlers
  const handleLike = () => {
    setReaction((prev) => (prev === 'like' ? 'none' : 'like'));
    console.log('User reaction: ', reaction === 'like' ? 'none' : 'like');
  };

  const handleDislike = () => {
    setReaction((prev) => (prev === 'dislike' ? 'none' : 'dislike'));
    console.log('User reaction: ', reaction === 'dislike' ? 'none' : 'dislike');
  };

  // Simulate progress update
  useEffect(() => {
    if (!currentTrack) return;

    let timer;
    if (isPlaying && currentTime < currentTrack.duration) {
      timer = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1000, currentTrack.duration));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTime, currentTrack, setCurrentTime]);
  if (!currentTrack) return null;
 
  // Calculate progress for the bar
  const progressPercent = (currentTime / currentTrack.duration) * 100;

  // Format time as m:ss
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.round(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <footer style={styles.footer}>
      {/* Left Section: Album Art, Track Info, and Reaction Buttons */}
      <div style={styles.leftSection}>
        <img src={currentTrack.albumArt} alt="Album Art" style={styles.albumArt} />
        <div style={styles.trackInfo}>
          <span style={styles.trackTitle}>{currentTrack.title}</span>
          <span style={styles.trackArtist}>{currentTrack.artist}</span>
          <div style={styles.reactionContainer}>
            <button 
              onClick={handleLike} 
              style={{
                ...styles.reactionBtn,
                backgroundColor: reaction === 'like' ? '#1db954' : '#333',
              }}
            >
              👍
            </button>
            <button 
              onClick={handleDislike} 
              style={{
                ...styles.reactionBtn,
                backgroundColor: reaction === 'dislike' ? '#1db954' : '#333',
              }}
            >
              👎
            </button>
          </div>
        </div>
      </div>

      {/* Center Section: Playback Controls and Progress */}
      <div style={styles.middleSection}>
        <div style={styles.controlsContainer}>
          <button onClick={() => {
            setShowQueue(prev => {
              const newVal = !prev;
              console.log('Toggling showQueue to:', newVal);
              return newVal;
            });
          }} style={styles.controlBtn}>
            📜
          </button>
          <button onClick={handlePrev} style={styles.controlBtn}>
            ⏮
          </button>
          <div style={styles.playPauseCircle} onClick={handlePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </div>
          <button onClick={handleNext} style={styles.controlBtn}>
            ⏭
          </button>
          <button onClick={() => setCurrentTime(0)} style={styles.controlBtn}>
            🔁
          </button>
        </div>
        <div style={styles.progressContainer}>
          <span style={styles.timeText}>{formatTime(currentTime)}</span>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progressPercent}%`,
              }}
            />
          </div>
          <span style={styles.timeText}>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80px',
    backgroundColor: '#000',
    color: '#fff',
    padding: '0 20px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    zIndex: 1,
  },
  albumArt: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  trackInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  trackTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '4px',
  },
  trackArtist: {
    fontSize: '12px',
    color: '#bbb',
    marginBottom: '8px',
  },
  reactionContainer: {
    display: 'flex',
    gap: '10px',
  },
  reactionBtn: {
    border: 'none',
    background: '#333',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  middleSection: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '10px',
  },
  controlBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '28px',
    cursor: 'pointer',
    transition: 'color 0.3s ease, transform 0.3s ease',
  },
  playPauseCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#fff',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    cursor: 'pointer',
    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
    transition: 'transform 0.3s ease',
  },
  progressContainer: {
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  progressBar: {
    flex: 1,
    height: '4px',
    backgroundColor: '#333',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '4px',
    backgroundColor: '#1db954',
    transition: 'width 0.2s linear',
  },
  timeText: {
    fontSize: '12px',
    color: '#999',
    width: '40px',
    textAlign: 'center',
  },
};

export default ModernMusicFooter;