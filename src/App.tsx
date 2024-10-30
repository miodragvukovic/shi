import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { Box } from "@mui/material";
import Header from "./components/Header";
import { useUser } from "./context/UserContext";

const App = () => {
  const { userState } = useUser();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "0",
      }}
    >
      <Router>
        {userState.user && <Header />}
        <AppRoutes />
      </Router>
    </Box>
  );
};

export default App;
