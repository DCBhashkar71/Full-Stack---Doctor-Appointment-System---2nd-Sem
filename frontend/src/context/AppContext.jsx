import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = 'http://localhost:4000/api';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/doctor/list`);
      setDoctors(data);
    } catch (err) {
      toast.error('Failed to load doctors');
    }
  };

  const fetchUser = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/user/profile`);
      setUser(data);
    } catch (err) {
      toast.error('Session expired');
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    fetchDoctors();
    if (token) fetchUser();
  }, [token]);

  const value = { doctors, token, setToken, user, logout, fetchDoctors };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;