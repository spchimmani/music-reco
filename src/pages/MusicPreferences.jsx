import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Display label vs backend key mapping:
const genres = [
  { label: "Pop", value: "pop" },
  { label: "Rock", value: "rock" },
  { label: "Hip-Hop", value: "hip_hop" },
  { label: "Jazz", value: "jazz" },
  { label: "Classical", value: "classical" },
  { label: "EDM", value: "edm" },
  { label: "R&B", value: "rnb" },
  { label: "Country", value: "country" }
];
const artists = ["Taylor Swift", "Drake", "The Beatles", "Eminem", "BTS", "Billie Eilish"];

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  padding: 2rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Heading = styled.h1`
  margin-bottom: 1.5rem;
  text-align: center;
  color: #222;
  font-family: "Segoe UI", sans-serif;
`;

const SectionTitle = styled.h2`
  margin: 1rem 0;
  color: #222;
  font-size: 1.2rem;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const OptionCard = styled.div`
  background: #f5f5f5;
  color: #222;
  border-radius: 4px;
  padding: 0.8rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: background 0.3s, transform 0.2s;
  ${(props) => props.selected && `
    background: #6c63ff;
    color: #fff;
  `}
  &:hover {
    background: ${(props) => (props.selected ? "#5a54d1" : "#e0e0e0")};
    transform: translateY(-2px);
  }
`;

const SaveButton = styled.button`
  display: block;
  margin: 0 auto;
  background: #6c63ff;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  &:hover {
    background: #5a54d1;
  }
`;

const MusicPreferences = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const navigate = useNavigate();

  const toggleSelection = (list, setList, value) => {
    setList(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const handleSave = () => {
    console.log("Saved Preferences:", { selectedGenres, selectedArtists });
    // TODO: send to backend
    // save user genres and artists to local storage
    localStorage.setItem("userGenres", JSON.stringify(selectedGenres));
    localStorage.setItem("userArtists", JSON.stringify(selectedArtists));
    navigate("/home");
  };

  return (
    <PageWrapper>
      <Card>
        <Heading>Tell Us Your Music Taste</Heading>

        <SectionTitle>Choose Your Favorite Genres</SectionTitle>
        <OptionGrid>
          {genres.map(genre => (
            <OptionCard
              key={genre.value}
              selected={selectedGenres.includes(genre.value)}
              onClick={() => toggleSelection(selectedGenres, setSelectedGenres, genre.value)}
            >
              {genre.label}
            </OptionCard>
          ))}
        </OptionGrid>

        <SectionTitle>Select Artists You Love</SectionTitle>
        <OptionGrid>
          {artists.map(artist => (
            <OptionCard
              key={artist}
              selected={selectedArtists.includes(artist)}
              onClick={() => toggleSelection(selectedArtists, setSelectedArtists, artist)}
            >
              {artist}
            </OptionCard>
          ))}
        </OptionGrid>

        <SaveButton onClick={handleSave}>Save & Continue</SaveButton>
      </Card>
    </PageWrapper>
  );
};

export default MusicPreferences;