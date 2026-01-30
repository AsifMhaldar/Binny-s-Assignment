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
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
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
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={3}
        >
          🔐 Login
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              borderRadius: 2,
              py: 1.5,
              fontSize: "16px"
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
