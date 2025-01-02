import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
// Components
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import Footer from './Component/Footer';
import Loader from './Component/Loader';
import Login from './Pages/Admin/Login/Login';
// import LoginSub from './Pages/SubAdmin/Login/Login';
import  LoginSub from './Pages/SubAdmin/Login';
import AdminstrationLogin from './Pages/Adminstration/Login/AdminstrationLogin';
import AdminRoutes from './Component/AdminRoutes';
import AdminstrationRoutes from './Component/AdminstrationRoutes';
import SubAdminRoutes from './Component/SubAdminRoutes';


function AppContent() {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (!session && location.pathname !== '/administration/login') {
      navigate('/administration/login');
    } 
    else if (session) {
      setUserType(localStorage.getItem('user_type')); 
    }
  }, [navigate, location]);


  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location]);
  const administrationRoutes = (
    <>
        <AdminstrationRoutes/>
    </>
  );
  const adminRoutes = (
    <>
        <AdminRoutes/>
    </>
  );
  const subadminRoutes = (
    <>
        <SubAdminRoutes/>
    </>
  );
  return (
    <div className="page-wrapper"> 
      <div className="main-container"> 
        <Sidebar />
        <div className="dashboard-main">
          <Navbar />
          <div className="app-body ">
            {loading && <Loader />}
            {!loading && (
              <>
                {userType === 'administration' && administrationRoutes}
                {userType === 'admin' && adminRoutes}
                {userType === 'subadmin' && subadminRoutes}
              </>
            )}
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route path="administration/login" element={<AdminstrationLogin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sub-admin/login" element={<LoginSub/>} />
        <Route path="*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
