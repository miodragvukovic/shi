import React, { useRef, useCallback, useState, useEffect } from "react";
import { useInfiniteCharacters } from "../hooks/useCharacters";
import {
  Box,
  useMediaQuery,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import CharacterBox from "./CharacterBox";
import { Character } from "../Interfaces";

const TheList: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:760px)");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedName, setDebouncedName] = useState<string>("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteCharacters(debouncedName);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCharacterElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(searchTerm);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error loading characters.</p>;

  return (
    <Box sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Search by character name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: "30px", maxWidth: "600px" }}
        />
      </Box>
      {debouncedName && (
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: "20px", textAlign: "center" }}
        >
          Search results for characters containing letters:{" "}
          <span style={{ fontWeight: 600 }}>{debouncedName}</span>
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.results.map((character: Character, characterIndex: any) => {
              const isLastItem =
                data.pages.length - 1 === pageIndex &&
                page.results.length - 1 === characterIndex;

              return isLastItem ? (
                <Box
                  ref={lastCharacterElementRef}
                  key={character.id}
                  sx={{
                    width: isMobile ? "calc(50% - 10px)" : "calc(25% - 15px)",
                  }}
                >
                  <CharacterBox character={character} lastItem={isLastItem} />
                </Box>
              ) : (
                <CharacterBox
                  key={character.id}
                  character={character}
                  lastItem={isLastItem}
                />
              );
            })}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <CircularProgress />}
      </Box>
    </Box>
  );
};

export default TheList;
