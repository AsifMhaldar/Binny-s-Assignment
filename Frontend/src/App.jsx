import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />

        {/* Protected Admin Routes */}
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
