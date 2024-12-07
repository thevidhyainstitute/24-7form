import './App.css';
import Header from './pages/header';
import Home from "./pages/home"
import Login from "./pages/login";
import Register from "./pages/register";
import AdminDashboard from "./pages/admin-dashboard";
import TechnicianDashboard from "./pages/technician-dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './utils/protectedRoute'; // Adjust the import path
import Footer from './pages/footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          
          {/* Login Route - Only accessible when not logged in */}
          <Route element={<ProtectedRoute isLoginPage={true} />}>
            <Route path="/login" element={<Login />} />
          </Route>
          
          <Route path="/register" element={<Register />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          </Route>
          
          {/* Protected Technician Routes */}
          <Route element={<ProtectedRoute allowedRoles={['technician']} />}>
            <Route path="/technician-dashboard/*" element={<TechnicianDashboard />} />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;