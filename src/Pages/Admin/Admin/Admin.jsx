import React from "react";
import AddAdmin from "./AddAdmin";
import AdminList from "./AdminList";
import Brandcrump from "../../../Component/Brandcrump";
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