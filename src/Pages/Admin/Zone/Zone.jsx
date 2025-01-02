import React, { useState, useEffect } from "react";
import AddZone from "./AddZone";
import ZoneListing from "./ZoneListing";
import Brandcrump from "../../../Component/Brandcrump";
const Zone = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Get user type from localStorage (or any global state)
    const type = localStorage.getItem('user_type');
    setUserType(type);
  }, []);

  return (
    <div className="dashboard-main-body">
      <Brandcrump 
        pageName="Dashboard" 
        title="Zone" 
        url="/dashboard" 
        breadcrumb="Zone" 
      />    

      {/* Render components based on user type */}
      {userType === 'administration' && (
        <>
          <AddZone />
          <ZoneListing />
        </>
      )}
      {(userType === 'admin' || userType === 'subadmin') && <ZoneListing />}
    </div>
  );
};

export default Zone;
