import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserDetails(response.data.user);
    } catch (error) {
      setUserDetails(null); // Clear user details on error
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserDetails(null); // Clear user details
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch details on mount
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, fetchUserDetails, logout }}>
      {children}
    </UserContext.Provider>
  );
};
