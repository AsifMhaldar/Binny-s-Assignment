import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", { email, password });

      // save token in context
      login(res.data.token);

      // optional role-based redirect
      const decodedRole = JSON.parse(atob(res.data.token.split(".")[1])).role;

      if (decodedRole === "admin") {
        navigate("/home", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }

    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
          🔐 Login
        </Typography>

        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
                borderRadius: 2,
                py: 1.5,
                fontSize: "16px"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
