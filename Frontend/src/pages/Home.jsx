import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import MovieCard from "../components/MovieCard";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Stack,
  Divider
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { auth } = useContext(AuthContext);

  const [dbMovies, setDbMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  
  const [page, setPage] = useState(1);
  const moviesPerPage = 5;

  const fetchDbMovies = async () => {
    const res = await API.get(`/movies?sortBy=${sortBy}`);
    setDbMovies(res.data);
  };

  const deleteMovie = async (id) => {
    try {
      await API.delete(`/movies/${id}`);
      fetchDbMovies();
    } catch {
      alert("Delete failed");
    }
  };

  const searchMovies = async () => {
    if (!search) return fetchDbMovies();
    const res = await API.get(`/movies/search?query=${search}`);
    setDbMovies(res.data);
    setPage(1);
  };

  useEffect(() => {
    fetchDbMovies();
  }, [sortBy]);

  const start = (page - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  const paginatedMovies = dbMovies.slice(start, end);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to right, #fdfbfb, #ebedee)",
        p: 3
      }}
    >
      
      <Typography variant="h3" textAlign="center" mb={1}>
        🎥 Movie Dashboard
      </Typography>
      <Typography textAlign="center" color="text.secondary" mb={3}>
        Browse, Search and Manage Movies
      </Typography>

      
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        mb={3}
        alignItems="center"
      >
        <TextField
          label="Search movie..."
          sx={{ flex: 1 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="name">Sort by Name</MenuItem>
          <MenuItem value="rating">Sort by Rating</MenuItem>
          <MenuItem value="releaseDate">Sort by Release Date</MenuItem>
          <MenuItem value="duration">Sort by Duration</MenuItem>
        </Select>

        <Button variant="contained" onClick={searchMovies}>
          Search
        </Button>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      
      {paginatedMovies.length === 0 && (
        <Typography textAlign="center">No movies found</Typography>
      )}

      <Stack spacing={2}>
        {paginatedMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isAdmin={auth.user?.role === "admin"}
            onDelete={deleteMovie}
          />
        ))}
      </Stack>

     
      <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <Typography>Page {page}</Typography>

        <Button
          disabled={end >= dbMovies.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;
