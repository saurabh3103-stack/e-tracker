import React from "react";
import Brandcrump from "../../../Component/Brandcrump";
import AddSubAdmin from "./AddSubAdmin";
import SubAdminList from "./SubAdminList";
const SubAdmin = () => {
    return(
        <>
            <div class="dashboard-main-body">
                <Brandcrump
                    pageName="Dashboard" 
                    title="Sub Admin" 
                    url="/dashboard" 
                    breadcrumb="Sub Admin" 
                />
                <AddSubAdmin/>
                <SubAdminList/>
            </div>
        </>
    );  
}
export default SubAdmin;