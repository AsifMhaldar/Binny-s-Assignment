import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack
} from "@mui/material";

const AddMovie = () => {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
    releaseDate: ""
  });

  const handleSubmit = async () => {
    try {
      await API.post("/movies", movie);
      alert("Movie added successfully");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
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
          maxWidth: 500,
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
          🎬 Add New Movie
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Movie Title"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setMovie({ ...movie, title: e.target.value })
            }
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
          />

          <TextField
            label="Rating (0 - 10)"
            type="number"
            fullWidth
            onChange={(e) =>
              setMovie({ ...movie, rating: e.target.value })
            }
          />

          <TextField
            label="Duration (HH:MM:SS)"
            type="time"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 1 }}
            fullWidth
            onChange={(e) =>
              setMovie({ ...movie, duration: e.target.value })
            }
          />

          <TextField
            label="Release Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={(e) =>
              setMovie({ ...movie, releaseDate: e.target.value })
            }
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
            onClick={handleSubmit}
          >
            Add Movie
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddMovie;
