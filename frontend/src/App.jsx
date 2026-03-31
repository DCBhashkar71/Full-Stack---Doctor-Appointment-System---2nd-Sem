import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';

import { useEffect } from "react";
import axios from "axios";



const App = () => {

  useEffect(() => {
  axios.get("http://localhost:4000/api/test")
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}, []);

  const { token } = useContext(AppContext);

  const ProtectedRoute = ({ children }) => token ? children : <Navigate to="/login" />;

  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/appointment/:docId" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/my-appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;