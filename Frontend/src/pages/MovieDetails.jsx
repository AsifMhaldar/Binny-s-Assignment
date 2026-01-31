import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { Box, Typography, Paper, Button } from "@mui/material";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (error) {
        console.error("Failed to fetch movie", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          {movie.title}
        </Typography>

        <Typography sx={{ mt: 2 }}>{movie.description}</Typography>

        <Box sx={{ mt: 2 }}>
          <Typography>⭐ Rating: {movie.rating}</Typography>
          <Typography>⏱ Duration: {movie.duration}</Typography>
          <Typography>📅 Release Date: {new Date(movie.releaseDate).toDateString()}</Typography>
          <Typography>🎭 Genre: {movie.genre}</Typography>
        </Box>

        <Button sx={{ mt: 3 }} variant="contained" href="/home">
          Back
        </Button>
      </Paper>
    </Box>
  );
};

export default MovieDetails;
