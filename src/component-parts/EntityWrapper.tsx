import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Button,
} from "@mui/material";
import { fetchCharacterInfo } from "../hooks/useCharacters";
import { Character, Location, EntityWrapperProps } from "../Interfaces";
import { fetchData } from "../hooks/fetchData";

const EntityWrapper: React.FC<EntityWrapperProps> = ({ target }) => {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    error: dataError,
    isLoading: isLoadingData,
  } = useQuery<Location | Character | any, Error>(
    [target, id],
    () => fetchData(target, id!),
    {
      enabled: !!id,
    }
  );

  const {
    data: listData,
    error: listDataError,
    isLoading: isLoadingListedData,
  } = useQuery<Character[], Error>(
    ["characters", data?.residents],
    () => {
      const payload = data?.residents || data?.characters;
      if (payload) {
        const residentIds = payload.map((url: string) => url.split("/").pop()!);
        return fetchCharacterInfo(residentIds.join(","));
      }
      return [];
    },
    {
      enabled:
        (!!data?.residents && data.residents.length > 0) ||
        (!!data?.characters && data.characters.length > 0),
    }
  );

  if (isLoadingData || isLoadingListedData)
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (dataError || listDataError)
    return (
      <Typography variant="h6" align="center">
        Error fetching location or characters.
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 600, margin: "30px auto", textAlign: "center" }}>
      <Typography variant="h4">{data?.name}</Typography>
      <Typography variant="h6">Type: {data?.type}</Typography>
      <Typography variant="h6">Dimension: {data?.dimension}</Typography>
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Residents:
      </Typography>
      <List
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {listData.map((character) => (
          <ListItem
            key={character.id}
            sx={{ display: "inline-flex", width: "auto", p: 0 }}
          >
            <Link
              to={`/characters/${character.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                key={character.id}
                variant="contained"
                color="primary"
                sx={{ margin: "5px" }}
              >
                {character.name}
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EntityWrapper;
