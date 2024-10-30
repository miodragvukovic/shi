import { signOut } from "firebase/auth";
import { useUser } from "../context/UserContext";
import { auth } from "../firebaseConfig";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { dispatch } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "CLEAR_USER" });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <Button sx={{ color: "#fff" }} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
