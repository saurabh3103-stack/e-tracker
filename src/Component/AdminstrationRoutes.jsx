import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
// import Dashboard from '../Pages/Adminstration/Dashboard';
import Adduser from '../Pages/Adminstration/AddVehicle/Adduser';
import Routes_path from '../Pages/Adminstration/AddRoutes/Routes_path';
import Users from '../Pages/Adminstration/AddVehicle/User';
import Preview from '../Pages/Adminstration/AddVehicle/Preview';
import FormWizard from '../Pages/Adminstration/AddVehicle/FormWizard';
import Verifier from '../Pages/Adminstration/Verifier/Verifier';
import AddVerifier from '../Pages/Adminstration/Verifier/AddVerifier';
import Zone from '../Pages/Adminstration/Zone/Zone';
import Challan from '../Pages/Adminstration/Challan/Challan';
import TodayReport from '../Pages/Adminstration/Report/TodayReport';
import AllReport from '../Pages/Adminstration/Report/AllReport';
import ZoneHead from '../Pages/Adminstration/Zone/ZoneHead';
import Admin from '../Pages/Adminstration/Admin/Admin';
import SubAdmin from '../Pages/Adminstration/SubAdmin/SubAdmin';
import Dashboard from '../Pages/Adminstration/Dashboard/Dashboard';
import AdministratorUpdateVerifier from "../Pages/Adminstration/Verifier/AdministratorUpdateVerifier";

const AdminstrationRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/administration' element={<Dashboard />} />
                <Route path='/administration/dashboard' element={<Dashboard />} />
                <Route path='/administration/add_user' element={<Adduser />} />
                <Route path='/administration/route' element={<Routes_path />} />
                <Route path='/administration/users' element={<Users />} />
                <Route path="/administration/preview/:userId/:status" element={<Preview />} />
                <Route path="/administration/form-wizard" element={<FormWizard/>}/>
                <Route path='/administration/verifier' element={<Verifier/>}/>
                <Route path='/administration/add-verifier' element={<AddVerifier/>}/>
                <Route path='/administration/update-verifier' element={<AdministratorUpdateVerifier/>}/>
                <Route path='/administration/zone' element={<Zone/>}/>
                <Route path='/administration/zone-head' element={<ZoneHead/>}/>
                <Route path='/administration/challan' element={<Challan/>}/>
                <Route path='/administration/today-report' element={<TodayReport/>}/>
                <Route path='/administration/all-report' element={<AllReport/>}/>
                <Route path="/administration/admin" element={<Admin/>}/>
                <Route path="/administration/sub-admin" element={<SubAdmin/>}/>
            </Routes>
        </>
    );
}

export default AdminstrationRoutes;