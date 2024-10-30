import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterInfo } from "../hooks/useCharacters";
import { Character } from "../Interfaces";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const passedCharacter = location.state?.character as Character | undefined;

  const {
    data: fetchedCharacter,
    isLoading,
    error,
  } = useQuery<Character>(
    ["character", id],
    () => fetchCharacterInfo(id || ""),
    {
      enabled: !passedCharacter,
    }
  );

  const getEpisodeNumber = (episodeUrl: string): number => {
    const parts = episodeUrl.split("/");
    return parseInt(parts[parts.length - 1], 10);
  };

  const character = passedCharacter || fetchedCharacter;

  if (isLoading && !passedCharacter) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">Error loading character details</Typography>
    );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={4}>
      {character && (
        <>
          <img
            src={character.image}
            alt={character.name}
            style={{ borderRadius: "50%", marginBottom: 16 }}
          />
          <Typography variant="h4" gutterBottom>
            {character.name}
          </Typography>
          <Typography variant="subtitle1">
            Status: {character.status}
          </Typography>
          <Typography variant="subtitle1">
            Species: {character.species}
          </Typography>
          <Typography variant="subtitle1">
            Gender: {character.gender}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Location:{" "}
            <Link
              to={`/location/${character.location.url.split("/").pop()}`}
              style={{
                marginLeft: "4px",
                color: "#1976d2",
                textDecoration: "underline",
              }}
            >
              {character.location.name}
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 600,
            }}
          >
            Character appeared in episodes:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "600px",
            }}
          >
            {character.episode.map((episodeUrl: string) => {
              const episodeNumber = getEpisodeNumber(episodeUrl);
              return (
                <Button
                  key={episodeUrl}
                  variant="contained"
                  color="primary"
                  sx={{ margin: "5px" }}
                  component={Link}
                  to={`/episode/${episodeNumber}`}
                >
                  {episodeNumber}
                </Button>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CharacterDetail;
