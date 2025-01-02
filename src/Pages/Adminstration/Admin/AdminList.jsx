import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetTable from '../Table/GetTable';
import Brandcrump from '../../../Component/Brandcrump';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [admin, setAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Holds selected admin data
  const [isEditMode, setIsEditMode] = useState(false); // Determines if we're in edit mode
  const [newPassword, setNewPassword] = useState(''); // Holds the new password input
  const [oldPassword, setOldPassword] = useState(''); // Holds the old password input
  const [showPasswordModal, setShowPasswordModal] = useState(false); // Controls password update modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Controls details update modal

  // Fetch all admins
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/api/admin/', {
        headers: {
          'x-api-key': 'your_secret_key',
        },
      });
      setAdmin(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single admin by ID
  const fetchAdminById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/admin/${id}`,
        { headers: { 'x-api-key': 'your_secret_key' } }
      );
      setSelectedAdmin(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch admin details when modal is opened
  useEffect(() => {
    if (showDetailsModal && selectedAdmin) {
      fetchAdminById(selectedAdmin._id);  // Fetch only when selectedAdmin is not null
    }
  }, [showDetailsModal, selectedAdmin]);

  // Show the details modal in view mode
  const handleShow = async (id) => {
    await fetchAdminById(id);
    setIsEditMode(false); // Set to view mode
    setShowDetailsModal(true); // Open the details update modal
  };

  // Show the details modal in edit mode
  const handleShowEdit = async (id) => {
    await fetchAdminById(id);
    setIsEditMode(true); // Set to edit mode
    setShowDetailsModal(true); // Open the details update modal
  };

  // Update the admin status (active/inactive)
  const updateStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.put(
        `http://localhost:3002/api/admin/update-status/${id}`,
        { status: newStatus },
        { headers: { 'x-api-key': 'your_secret_key' } }
      );
      if (response.status === 200) {
        setAdmin((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === id ? { ...admin, status: newStatus } : admin
          )
        );
        toast.success('Status updated successfully!');
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      toast.error('Error updating status');
    }
  };

  // Update the password
  const updatePassword = async (id) => {
    if (!oldPassword || !newPassword) {
      toast.error('Please enter both old and new passwords');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/api/admin/update-password/${id}`,
        { oldPassword, newPassword },
        { headers: { 'x-api-key': 'your_secret_key' } }
      );

      if (response.status === 200) {
        toast.success('Password updated successfully!');
        setNewPassword(''); // Clear the input field
        setOldPassword(''); // Clear old password field
        setShowPasswordModal(false); // Close password update modal
      } else {
        toast.error('Failed to update password');
      }
    } catch (err) {
      toast.error('Error updating password');
    }
  };

  // Update admin details (name and email)
  const updateDetails = async (id) => {
    try {
      const updatedData = {
        admin_name: selectedAdmin.admin_name, // Assume form fields are bound to selectedAdmin state
        email: selectedAdmin.email,
      };

      const response = await axios.put(
        `http://localhost:3002/api/admin/${id}`,
        updatedData,
        { headers: { 'x-api-key': 'your_secret_key' } }
      );

      if (response.status === 200) {
        toast.success('Details updated successfully!');
        setShowDetailsModal(false); // Close details update modal
      } else {
        toast.error('Failed to update details');
      }
    } catch (err) {
      toast.error('Error updating details');
    }
  };

  // Table columns configuration
  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Zone',
      selector: (row) => row.zone_name || row.zone_name,
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Admin Name',
      selector: (row) => row.admin_name || row.admin_name,
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
        <button
          className={`btn btn-${row.status === 'active' ? 'danger' : 'success'} btn-sm`}
          onClick={() => updateStatus(row._id, row.status)}
        >
          {row.status === 'active' ? 'Inactive' : 'Active'}
        </button>
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
            className="btn btn-sm btn-success me-1"
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
          <button
            type="button"
            className="btn btn-sm btn-info me-1"
            onClick={() => {
              setSelectedAdmin(row);
              setShowPasswordModal(true); 
            }}
          >
            Change Password
          </button>
        </div>
      ),
      sortable: false,
    }
  ];

  return (
    <>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Admin User List"
          url="/dashboard"
          breadcrumb="Admin List"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">Admin List</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <GetTable data={admin} columns={columns} title="Admin List" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        
        {/* Update Admin Details Modal */}
        {showDetailsModal && selectedAdmin && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Admin Details</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowDetailsModal(false)}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Admin Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedAdmin.admin_name || ''}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, admin_name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={selectedAdmin.email || ''}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, email: e.target.value })}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={() => updateDetails(selectedAdmin._id)}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Password Update Modal */}
        {showPasswordModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Change Password</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Old Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={() => updatePassword(selectedAdmin._id)}
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminList;
