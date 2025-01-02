import React, {useState, useEffect} from 'react';
import { useNavigate, Link} from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [usrId , setUsrId]= useState(null);
  useEffect(() => {
    const storedUserType = localStorage.getItem('user_type') || 'guest'; // Default to 'guest'
    const storeusrId = localStorage.getItem('user_id') || '0'; // Default to '0'
    setUsrId(storeusrId);
    setUserType(storedUserType);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('session');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_email');
    navigate('/login');
  };

  console.log(usrId);
  return (
    <>
       <div className="navbar-header">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <div className="d-flex flex-wrap align-items-center gap-4">
              <button type="button" className="sidebar-toggle">
                <iconify-icon icon="heroicons:bars-3-solid" className="icon text-2xl non-active"></iconify-icon>
              </button>
              <button type="button" className="sidebar-mobile-toggle">
                <iconify-icon icon="heroicons:bars-3-solid" className="icon"></iconify-icon>
              </button>
              <form className="navbar-search">
                <input type="text" name="search" placeholder="Search" />
              </form>
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="dropdown">
                <button
                  className="d-flex justify-content-center align-items-center rounded-circle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src="assets/images/user.png"
                    alt="image"
                    className="w-40-px h-40-px object-fit-cover rounded-circle"
                  />
                </button>
                <div className="dropdown-menu to-top dropdown-menu-sm">
                  <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                    <div>
                      <h6 className="text-lg text-primary-light fw-semibold mb-2">Deific India</h6>
                      <span className="text-secondary-light fw-medium text-sm" style={{textTransform:"capitalize"}}>{userType}</span>
                    </div>
                    <button type="button" className="hover-text-danger">
                      <iconify-icon icon="radix-icons:cross-1" className="icon text-xl"></iconify-icon>
                    </button>
                  </div>
                  <ul className="to-top-list">
                    {userType === 'admin' && (
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          to={'admin/dashboard'}
                        >
                          <iconify-icon icon="fluent:shield-checkmark-24-filled" className="icon text-xl"></iconify-icon> Admin Dashboard
                        </Link>
                      </li>
                    )}
                    {userType === 'subadmin' && (
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          to={'sub-admin/dashboard'}
                        >
                          <iconify-icon icon="heroicons:shield-exclamation-20-solid" className="icon text-xl"></iconify-icon> Subadmin Dashboard
                        </Link>
                      </li>
                    )}
                    {userType === 'administration' && (
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          to={'administration/dashboard'}
                        >
                          <iconify-icon icon="mdi:office-building-outline" className="icon text-xl"></iconify-icon> Administration Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <a
                        className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                        href="view-profile.html"
                      >
                        <iconify-icon icon="solar:user-linear" className="icon text-xl"></iconify-icon> My Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                        onClick={handleLogout}
                        href="javascript:void(0)"
                      >
                        <iconify-icon icon="lucide:power" className="icon text-xl"></iconify-icon> Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
