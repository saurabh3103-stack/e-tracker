import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetTable from '../Table/GetTable';
import Brandcrump from '../../../Component/Brandcrump';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [admin, setAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Holds selected sub-admin data
  const [isEditMode, setIsEditMode] = useState(false); // Determines if we're in edit mode
  const [subAdminData, setSubAdminData] = useState({ subadmin_name: '', email: '', password: '' });

  const fetchSubAdminById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3002/api/sub-admin/${id}`,
        {
          headers: { 'x-api-key': 'your_secret_key' },
        }
      );
      setSelectedAdmin(response.data);
      setSubAdminData({
        subadmin_name: response.data.subadmin_name,
        email: response.data.email,
        password: response.data.password,
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching sub-admin by ID:', err);
      toast.error('Failed to fetch sub-admin data');
    }
  };

  const handleShow = async (id) => {
    await fetchSubAdminById(id);
    setIsEditMode(false); // Set to view mode
  };

  const handleShowEdit = async (id) => {
    await fetchSubAdminById(id);
    setIsEditMode(true); // Set to edit mode
  };

  const updateStatus = async (id, currentStatus) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.put(
        `http://localhost:3002/api/sub-admin/${id}/status`,
        { status: newStatus },
        { headers: { 'x-api-key': 'your_secret_key' } }
      );
  
      if (response.status === 200) {
        setAdmin((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === id ? { ...admin, status: newStatus } : admin
          )
        );
        toast.success(response.data.message || 'Status updated successfully!');
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('An error occurred while updating status');
    } finally {
      setLoading(false);
    }
  };
  

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/api/sub-admin/', {
        headers: { 'x-api-key': 'your_secret_key' },
      });
      setAdmin(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []
);
const handleFormChange = (e) => {
  const { name, value } = e.target;
  setSubAdminData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { subadmin_name, email, password } = subAdminData;
    const response = await axios.put(
      `http://localhost:3002/api/sub-admin/${selectedAdmin._id}`,
      { subadmin_name, email, password },
      { headers: { 'x-api-key': 'your_secret_key' } }
    );
    toast.success(response.data.message || 'Sub-admin updated successfully!');
    setSelectedAdmin(response.data.subAdmin);
    setIsEditMode(false); // Set to view mode after update
  } catch (err) {
    console.error('Error updating sub-admin:', err);
    toast.error('Failed to update sub-admin');
  } finally {
    setLoading(false);
  }
};
  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Sub Admin Name',
      selector: (row) => row.subadmin_name,
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Status',
      selector: (row) => (
        <>
          {row.status === 'active' ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => updateStatus(row._id, row.status)}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Inactive'}
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => updateStatus(row._id, row.status)}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Active'}
            </button>
          )}
        </>
      ),
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Date',
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <button
            type="button"
            className="btn btn-sm btn-info me-1"
            onClick={() => handleShow(row._id)}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-sm btn-warning me-1"
            onClick={() => handleShowEdit(row._id)}
          >
            Edit
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Sub Admin User"
          url="/dashboard"
          breadcrumb="Sub Admin User"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">E-Rickshaw Route List</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <GetTable data={admin} columns={columns} title={'Sub Admin'} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />

        {/* View/Edit Modal */}
        {selectedAdmin && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditMode ? 'Edit Sub Admin' : 'View Sub Admin'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedAdmin(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  {isEditMode ? (
                    // Edit Form
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="subadmin_name"
                          value={subAdminData.subadmin_name}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={subAdminData.email}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={subAdminData.password}
                          onChange={handleFormChange}
                        />
                      </div>
                    </form>

                  ) : (
                    // View Mode
                    <div>
                      <p>
                        <strong>Name:</strong> {selectedAdmin.subadmin_name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedAdmin.email}
                      </p>
                      <p>
                        <strong>Status:</strong> {selectedAdmin.status}
                      </p>
                      {/* Add other fields as needed */}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  {isEditMode && (
                    <button type="button" className="btn btn-sm btn-success">
                      Update
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => setSelectedAdmin(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubAdmin;
