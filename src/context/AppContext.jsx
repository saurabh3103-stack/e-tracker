// AppContext.jsx
import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  // Define your shared states
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [vehicleId, setVehicleId] = useState(null);
  const [registration_number, setRegistration_number] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        formData,
        setFormData,
        vehicleId,
        setVehicleId,
        theme,
        setTheme,
        notifications,
        setNotifications,
        registration_number,setRegistration_number
      }}
    >
      {children}
    </AppContext.Provider>
  );
};