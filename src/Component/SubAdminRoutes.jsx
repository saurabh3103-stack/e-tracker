import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import Dashboard from '../Pages/SubAdmin/Dashboard/Dashboard';
import Adduser from '../Pages/SubAdmin/AddVehicle/Adduser';
import Routes_path from '../Pages/SubAdmin/AddRoutes/Routes_path';
import Users from '../Pages/SubAdmin/AddVehicle/User';
import Preview from '../Pages/SubAdmin/AddVehicle/Preview';
import FormWizard from '../Pages/SubAdmin/AddVehicle/FormWizard';
import Verifier from '../Pages/SubAdmin/Verifier/Verifier';
import AddVerifier from '../Pages/SubAdmin/Verifier/AddVerifier';
import Zone from '../Pages/SubAdmin/Zone/Zone';
import Challan from '../Pages/SubAdmin/Challan/Challan';
import TodayReport from '../Pages/SubAdmin/Report/TodayReport';
import AllReport from '../Pages/SubAdmin/Report/AllReport';
import ZoneHead from '../Pages/SubAdmin/Zone/ZoneHead';
import Admin from '../Pages/SubAdmin/Admin/Admin';
import UpdateVerifier from '../Pages/SubAdmin/Verifier/UpdateVerifier';

const SubAdminRoutes = () => {
    return (
        <Routes>
            <Route path='/sub-admin' element={<Dashboard />} />
            <Route path='/sub-admin/dashboard' element={<Dashboard />} />
            <Route path='/sub-admin/add_user' element={<Adduser />} />
            <Route path='/sub-admin/route' element={<Routes_path />} />
            <Route path='/sub-admin/users' element={<Users />} />
            <Route path="/sub-admin/preview/:userId/:status" element={<Preview />} />
            <Route path="/sub-admin/form-wizard" element={<FormWizard/>}/>
            <Route path='/sub-admin/verifier' element={<Verifier/>}/>
            <Route path='/sub-admin/add-verifier' element={<AddVerifier/>}/>
            <Route path='/sub-admin/zone' element={<Zone/>}/>
            <Route path='/sub-admin/zone-head' element={<ZoneHead/>}/>
            <Route path='/sub-admin/challan' element={<Challan/>}/>
            <Route path='/sub-admin/today-report' element={<TodayReport/>}/>
            <Route path='/sub-admin/all-report' element={<AllReport/>}/>
            <Route path="/sub-admin/admin" element={<Admin/>}/>
            <Route path='/sub-admin/update-verifier' element={<UpdateVerifier/>}/>
            
        </Routes>
    );
}

export default SubAdminRoutes;