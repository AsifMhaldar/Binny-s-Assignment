import { useState } from "react";
import API from "../services/api";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", {
        email,
        password,
        role: "user"
      });

      alert("Registered successfully");
      navigate("/login", { replace: true });

    } catch (error) {
      console.error("Register error:", error);
      alert(error.response?.data?.message || "Registration failed");
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
          📝 Register
        </Typography>

        <form onSubmit={handleRegister}>
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
