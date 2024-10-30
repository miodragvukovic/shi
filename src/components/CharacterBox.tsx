import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { CharacterBoxProps } from "../Interfaces";

const StyledBox = styled(Box)`
  width: calc(25% - 15px);
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  background-color: #f1eeee;
  transition: 0.3s ease-out;
  &:hover {
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.2);
  }
  &:nth-of-type(4n) {
    margin-right: 0;
  }
  &.last-item {
    width: 100%;
  }
  @media (max-width: 760px) {
    width: calc(50% - 10px);
    margin-right: 20px;
    &:nth-of-type(4n) {
      margin-right: unset;
    }
    &:nth-of-type(even) {
      margin-right: 0;
    }
  }
`;

const CharacterBox: React.FC<CharacterBoxProps> = ({ character, lastItem }) => {
  return (
    <StyledBox key={character.id} className={lastItem ? "last-item" : ""}>
      <Link
        to={`/characters/${character.id}`}
        state={{ character }}
        style={{
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={character.image}
          alt={character.image}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 8,
          }}
        />
        <Box
          component="span"
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            fontSize: "1rem",
            padding: "10px 20px 0",
          }}
        >
          {character.name}
        </Box>
        <Box
          component="span"
          sx={{
            fontWeight: "400",
            color: "#333",
            textAlign: "center",
            fontSize: "1rem",
            padding: 1,
            mb: 1,
          }}
        >
          Status: {character.status}
        </Box>
      </Link>
    </StyledBox>
  );
};

export default CharacterBox;
