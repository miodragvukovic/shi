import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../context/UserContext";
import { auth } from "../firebaseConfig";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const flexColumnCenter: any = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useUser();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "SET_USER", payload: result.user });
      navigate("/characters");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        ...flexColumnCenter,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          ...flexColumnCenter,
          maxWidth: "400px",
          px: 2,
          py: 4,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Register;
