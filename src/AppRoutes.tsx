import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Characters from "./pages/Characters";
import { useUser } from "./context/UserContext";
import { Box, CircularProgress } from "@mui/material";
import CharacterDetail from "./pages/CharacterDetail";
import LocationDetail from "./pages/LocationDetail";
import EpisodeDetail from "./pages/EpisodeDetails";

const AppRoutes: React.FC = () => {
  const { userState } = useUser();

  if (userState.loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          userState.user ? <Navigate to="/characters" replace /> : <Login />
        }
      />
      <Route
        path="/register"
        element={
          userState.user ? <Navigate to="/characters" replace /> : <Register />
        }
      />

      <Route
        path="/"
        element={
          userState.user ? <Characters /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/characters"
        element={
          <ProtectedRoute>
            <Characters />
          </ProtectedRoute>
        }
      />
      <Route
        path="/characters/:id"
        element={
          <ProtectedRoute>
            <CharacterDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/location/:id"
        element={
          <ProtectedRoute>
            <LocationDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/episode/:id"
        element={
          <ProtectedRoute>
            <EpisodeDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
