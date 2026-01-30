import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { TextField, Button, Box, Typography } from "@mui/material";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
    releaseDate: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`);

        
        const data = res.data;
        data.releaseDate = data.releaseDate
          ? data.releaseDate.split("T")[0]
          : "";

        setMovie(data);
        setLoading(false);
      } catch (error) {
        alert("Failed to load movie");
      }
    };

    fetchMovie();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await API.put(`/movies/${id}`, movie);
      alert("Movie updated successfully");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.error || "Update failed");
    }
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5">Edit Movie</Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={movie.title}
        onChange={(e) => setMovie({ ...movie, title: e.target.value })}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={movie.description}
        onChange={(e) =>
          setMovie({ ...movie, description: e.target.value })
        }
      />

      <TextField
        label="Rating"
        type="number"
        fullWidth
        margin="normal"
        value={movie.rating}
        onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
      />

  
      <TextField
        label="Duration (HH:MM:SS)"
        type="time"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 1 }}
        value={movie.duration}
        onChange={(e) =>
          setMovie({ ...movie, duration: e.target.value })
        }
      />

  
      <TextField
        label="Release Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={movie.releaseDate}
        onChange={(e) =>
          setMovie({ ...movie, releaseDate: e.target.value })
        }
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpdate}>
        Update Movie
      </Button>
    </Box>
  );
};

export default EditMovie;
