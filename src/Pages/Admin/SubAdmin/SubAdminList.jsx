import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetTable from '../Table/GetTable';
import Loader from '../../../Component/Loader';
import { Modal, Button, Form } from 'react-bootstrap';

const SubAdminList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subadmin, setSubadmin] = useState([]);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Name',
      selector: (row) => row.subadmin_name || row.subadmin_name,
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
              onClick={() => toggleStatus(row._id, 'inactive')}
            >
              Inactive
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => toggleStatus(row._id, 'active')}
            >
              Active
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
            onClick={() => handleView(row._id)}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-sm btn-warning me-1"
            onClick={() => handleEdit(row._id)}
          >
            Edit
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('user_id');
      const response = await axios.get(
        `http://localhost:3002/api/sub-admin/by-admin/${userId}`,
        {
          headers: {
            'x-api-key': 'your_secret_key',
          },
        },
      );
      setSubadmin(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (subAdminId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3002/api/sub-admin/${subAdminId}/status`,
        { status: newStatus },
        { headers: { 'x-api-key': 'your_secret_key' } },
      );
      fetchData(); // Refresh the list after updating the status
    } catch (err) {
      setError(err.message);
    }
  };

  const handleView = async (subAdminId) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/sub-admin/${subAdminId}`,
        {
          headers: { 'x-api-key': 'your_secret_key' },
        },
      );
      setSelectedSubAdmin(response.data);
      setViewModalVisible(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (subAdminId) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/sub-admin/${subAdminId}`,
        {
          headers: { 'x-api-key': 'your_secret_key' },
        },
      );
      setSelectedSubAdmin(response.data);
      setEditModalVisible(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { subadmin_name, email, password } = selectedSubAdmin;
      await axios.put(
        `http://localhost:3002/api/sub-admin/${selectedSubAdmin._id}`,
        { subadmin_name, email, password },
        { headers: { 'x-api-key': 'your_secret_key' } },
      );
      setEditModalVisible(false);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="row gx-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-light m-0">Sub Admin</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <Loader />
              ) : (
                <div className="table-responsive">
                  <GetTable
                    data={subadmin}
                    columns={columns}
                    title={'Subadmin Management'}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Modal
        show={viewModalVisible}
        onHide={() => setViewModalVisible(false)}
        centered
      >
        <Modal.Header closeButton className="bg-info  modal-header">
          <Modal.Title>
            <h6 className="text-light">View Sub-admin</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubAdmin ? (
            <>
              <p>
                <strong>Name:</strong> {selectedSubAdmin.subadmin_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedSubAdmin.email}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {selectedSubAdmin.status === 'active' ? 'Active' : 'Inactive'}
              </p>
              <p>
                <strong>Created At:</strong>{' '}
                {new Date(selectedSubAdmin.createdAt).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p>No sub-admin details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setViewModalVisible(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Model */}
      <Modal
        show={editModalVisible}
        onHide={() => setEditModalVisible(false)}
        centered
      >
        <Modal.Header closeButton className="bg-info  modal-header">
          <Modal.Title>
            <h6 className="text-light">Edit Sub-admin</h6>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedSubAdmin?.subadmin_name || ''}
                onChange={(e) =>
                  setSelectedSubAdmin({
                    ...selectedSubAdmin,
                    subadmin_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedSubAdmin?.email || ''}
                onChange={(e) =>
                  setSelectedSubAdmin({
                    ...selectedSubAdmin,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={selectedSubAdmin?.showPassword ? 'text' : 'password'}
                  value={selectedSubAdmin?.password || ''}
                  onChange={(e) =>
                    setSelectedSubAdmin({
                      ...selectedSubAdmin,
                      password: e.target.value,
                    })
                  }
                />
                <Button
                  variant="success"
                  onClick={() =>
                    setSelectedSubAdmin({
                      ...selectedSubAdmin,
                      showPassword: !selectedSubAdmin?.showPassword,
                    })
                  }
                >
                  {selectedSubAdmin?.showPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setEditModalVisible(false)}
            >
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SubAdminList;
