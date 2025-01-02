import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import Dashboard from '../Pages/Admin/Dashboard/Dashboard';
import Adduser from '../Pages/Admin/AddVehicle/Adduser';
import Routes_path from '../Pages/Admin/AddRoutes/Routes_path';
import Users from '../Pages/Admin/AddVehicle/User';
import Preview from '../Pages/Admin/AddVehicle/Preview';
import FormWizard from '../Pages/Admin/AddVehicle/FormWizard';
import Verifier from '../Pages/Admin/Verifier/Verifier';
import AddVerifier from '../Pages/Admin/Verifier/AddVerifier';
import Zone from '../Pages/Admin/Zone/Zone';
import Challan from '../Pages/Admin/Challan/Challan';
import TodayReport from '../Pages/Admin/Report/TodayReport';
import AllReport from '../Pages/Admin/Report/AllReport';
import ZoneHead from '../Pages/Admin/Zone/ZoneHead';
import Admin from '../Pages/Admin/Admin/Admin';
import SubAdmin from "../Pages/Admin/SubAdmin/SubAdmin";
import PreviewVerifier from "../Pages/Admin/Verifier/PreviewVerifier";
import UpdateVerifier from "../Pages/Admin/Verifier/UpdateVerifier";
import VehicleRegistration from "../Pages/Admin/AddVehicle/VechileRegistration";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/admin' element={<Dashboard />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/add_user' element={<Adduser />} />
            <Route path='/admin/route' element={<Routes_path />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path="/admin/preview/:userId/:status" element={<Preview />} />
            <Route path="/admin/form-wizard" element={<FormWizard/>}/>
            <Route path='/admin/verifier' element={<Verifier/>}/>
            <Route path='/admin/preview-verifier' element={<PreviewVerifier/>}/>
            <Route path='/admin/update-verifier' element={<UpdateVerifier/>}/>

            <Route path='/admin/add-verifier' element={<AddVerifier/>}/>
            <Route path='/admin/zone' element={<Zone/>}/>
            <Route path='/admin/zone-head' element={<ZoneHead/>}/>
            <Route path='/admin/challan' element={<Challan/>}/>
            <Route path='/admin/today-report' element={<TodayReport/>}/>
            <Route path='/admin/all-report' element={<AllReport/>}/>
            <Route path="/admin/admin" element={<Admin/>}/>
            <Route path="/admin/sub-admin" element={<SubAdmin/>}/>
            <Route path= "/admin/VehicleRegistration" element={<VehicleRegistration/>}/>
            <Route path='/admin/user/registration' element={<VehicleRegistration/>} />

        </Routes>
    );
}

export default AdminRoutes;