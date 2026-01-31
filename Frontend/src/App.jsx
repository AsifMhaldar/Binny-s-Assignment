import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected user routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/add"
          element={
            <ProtectedRoute role="admin">
              <AddMovie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <EditMovie />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
