import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "../context/UserContext";
import LogoutButton from "./Logout";

const StyledMenuItem = styled(MenuItem)`
  a,
  button {
    text-transform: uppercase;
    text-decoration: none;
    color: #000;
    padding: 0;
    font-weight: 400;
    font-size: 14px;
  }
`;

const Header: React.FC = () => {
  const { userState } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width:760px)");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {userState.user && (
            <Typography variant="body1" color="inherit">
              Welcome {userState.user.email}
            </Typography>
          )}
        </Box>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <StyledMenuItem onClick={handleMenuClose}>
                <Link to="/characters">Characters</Link>
              </StyledMenuItem>
              <StyledMenuItem onClick={handleMenuClose}>
                <LogoutButton />
              </StyledMenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button component={Link} to="/characters" color="inherit">
              Characters
            </Button>
            <LogoutButton />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
