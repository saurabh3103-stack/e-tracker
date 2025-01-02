import React, { useState, useEffect } from "react";
import '../../public/Update/css/remixicon.css';
import AdminSidebar from "./AdminSidebar";
import SubAdminSidebar from "./SubAdminSidebar";
import AdminstrationSidebar from "./AdminstrationSidebar";

function Sidebar() {
  const [userType, setUserType] = useState(null);

  // Set userType from localStorage when the component mounts
  useEffect(() => {
    const userTypeFromStorage = localStorage.getItem('user_type');
    setUserType(userTypeFromStorage);
  }, []);
  const administration = <AdminstrationSidebar />;
  const admin = <AdminSidebar />;
  const subadmin = <SubAdminSidebar />;

  return (
    <>
      {userType === 'administration' && administration}
      {userType === 'admin' && admin}
      {userType === 'subadmin' && subadmin}
    </>
  );
}

export default Sidebar;
