import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <MovieIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            MovieApp
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Show only when logged in */}
          {auth.user && (
            <>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>

              <Button color="inherit" component={Link} to="/search">
                Search
              </Button>

              {auth.user.role === "admin" && (
                <Button color="inherit" component={Link} to="/admin/add">
                  Add Movie
                </Button>
              )}

              <Button
                color="inherit"
                variant="outlined"
                sx={{ borderColor: "white", ml: 1 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}

          {/* Show only when NOT logged in */}
          {!auth.user && (
            <>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
