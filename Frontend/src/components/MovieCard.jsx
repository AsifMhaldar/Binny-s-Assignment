import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, isAdmin, onDelete }) => {
  const formattedDate = movie.releaseDate
    ? new Date(movie.releaseDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (confirmDelete) {
      onDelete(movie._id);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 8,
          transform: "scale(1.01)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {movie.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
          <Typography>⭐ {movie.rating}</Typography>
          <Typography>⏱ {movie.duration}</Typography>
          <Typography>📅 {formattedDate}</Typography>
        </Box>

        {isAdmin && movie._id && (
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              component={Link}
              to={`/admin/edit/${movie._id}`}
              size="small"
              variant="contained"
            >
              Edit
            </Button>

            {onDelete && (
              <Button
                color="error"
                size="small"
                variant="outlined"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
