import React from "react";
import Brandcrump from"../../../Component/Brandcrump";
import AddAdmin from "./AddAdmin";
import AdminList from "./AdminList";

const Admin = () => {
    return(
        <>
            <div class="dashboard-main-body">
                <Brandcrump
                    pageName="Dashboard" 
                    title="Admin User" 
                    url="/dashboard" 
                    breadcrumb="Admin User" 
                />
                <AddAdmin/>
                <AdminList/>
            </div>
        </>
    );  
}
export default Admin;