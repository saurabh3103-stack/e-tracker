import React from "react";
import AddZoneHead from "./AddZoneHead";
import Brandcrump from "../../../Component/Brandcrump";
import ZoneHeadListing from "./ZoneHeadListing";

const ZoneHead = () => {
    return(
        <>
        <div className="dashboard-main-body">
        <Brandcrump 
            pageName="Dashboard" 
            title="Zone Head" 
            url="/dashboard" 
            breadcrumb="Zone Head" 
        />    
            <AddZoneHead/>
            <ZoneHeadListing/>
        </div>    
        </>
    );
}
export default ZoneHead;