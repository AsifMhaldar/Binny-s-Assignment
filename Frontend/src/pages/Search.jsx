import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import MovieCard from "../components/MovieCard";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const { auth } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);

  
  const fetchAllMovies = async () => {
    const res = await API.get("/movies");
    setMovies(res.data);
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const searchMovies = async () => {
    try {
      if (!query) {
        setSearched(false);
        return fetchAllMovies();
      }

      const res = await API.get(`/movies/search?query=${query}`);
      setMovies(res.data);
      setSearched(true);
    } catch (error) {
      console.log("Frontend error:", error.response?.data);
      alert("Search failed");
    }
  };

  const deleteMovie = async (id) => {
    try {
      await API.delete(`/movies/${id}`);
      setMovies(movies.filter((m) => m._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", p: 3 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        🔍 Search Movies
      </Typography>

    
      <Paper sx={{ maxWidth: 600, mx: "auto", p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Search by title..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="contained" onClick={searchMovies}>
            Search
          </Button>
        </Stack>
      </Paper>

     
      {searched && movies.length === 0 && (
        <Typography color="error" textAlign="center">
          Movie not found
        </Typography>
      )}

      
      <Stack spacing={2}>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isAdmin={auth.user?.role === "admin"}
            onDelete={deleteMovie}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Search;
