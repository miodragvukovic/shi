import Body from "../components/Body";
import { Container } from "@mui/material";

const Characters = () => {
  return (
    <>
      <Container
        component="main"
        sx={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Body />
      </Container>
    </>
  );
};

export default Characters;
