import React, { useState, ChangeEvent, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { auth } from "../firebaseConfig";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const flexColumnCenter: any = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useUser();
  const navigate = useNavigate();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "SET_USER", payload: result.user });
      navigate("/characters");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error during sign-in:", error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
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
        <Typography variant="h5" component="h1" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            fullWidth
            margin="normal"
            sx={{
              marginBottom: "30px",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginBottom: "30px",
            }}
          >
            Sign In
          </Button>
          <Box
            sx={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/register">Dont have an account, Register?</Link>
          </Box>
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

export default Login;
