
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SuccessPopup from '../../../Component/SuccessPopup';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Brandcrump from '../../../Component/Brandcrump';
import GetTable from '../Table/GetTable';

function Routes_path() {
  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1, // Dynamically generates serial numbers
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Start Point',
      selector: (row) => row.starting_point || row.start_point, // Handles both `starting_point` and `start_point` keys
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'End Point',
      selector: (row) => row.end_point,
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Date',
      selector: (row) => new Date(row.createdAt).toLocaleDateString(), // Formats the created date
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
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
          {row.status === 0 ? (
            <button
              type="button"
              className="btn btn-sm btn-success mr-1"
              onClick={() => activeStatus(row._id)}
            >
              Active
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => updateStatus(row._id)}
            >
              Inactive
            </button>
          )}
        </div>
      ),
      sortable: false,
    },
  ];

  // Example functions for the Action column buttons

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [inputFields, setInputFields] = useState([{ value: '' }]);
  const [formData, setFormData] = useState({
    start_point: '',
    end_point: '',
  });
  const [editFormData, setEditFormData] = useState({
    start_point: '',
    end_point: '',
    id: '',
  });

  const validateForm = () => {
    // Simplified validation logic
    return formData.start_point !== '' && formData.end_point !== '';
  };

  const handleClosePopup = () => {
    setIsSubmitted(false);
    navigate('/route');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEditInputChange = (e) => {
    const { id, value } = e.target;
    setEditFormData({ ...editFormData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const adminId = localStorage.getItem('user_id');
        const response = await axios.post(
          'http://localhost:3002/api/userPath/add_routes',
          {
            ...formData,
            admin_id: adminId, // Add admin_id to the request
          },
          {
            headers: {
              'x-api-key': 'your_secret_key',
            },
          },
        );
        setError('');
        setIsSubmitted(true);
        setIsVisible(true);
        setFormData({ start_point: '', end_point: '' });
        fetchData(); // Refresh the data after successful addition
      } catch (error) {
        setError('Failed to add route.');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const adminId = localStorage.getItem('user_id');
      const response = await axios.get(
        `http://localhost:3002/api/userPath/admin/` + adminId,
        {
          headers: {
            'x-api-key': 'your_secret_key',
          },
        },
      );
      console.log(response.data);
      setRoutes(response.data.data);
    } catch (err) {
      console.error(err); // Log full error details for debugging
      setError(err.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShow = (id) => {
    axios
      .get(`http://localhost:3002/api/userPath/${id}`, {
        headers: {
          'x-api-key': 'your_secret_key',
        },
      })
      .then((response) => {
        setSelectedData(response.data);
        setShowViewModal(true);
      })
      .catch((error) => {
        console.error('Error fetching data by ID:', error);
      });
  };

  const handleShowEdit = (id) => {
    axios
      .get(`http://localhost:3002/api/userPath/${id}`, {
        headers: {
          'x-api-key': 'your_secret_key',
        },
      })
      .then((response) => {
        setEditFormData({
          start_point: response.data.start_point || '',
          end_point: response.data.end_point || '',
          id: response.data._id || '',
        });
        setShowEditModal(true);
      })
      .catch((error) => {
        console.error('Error fetching data by ID:', error);
      });
  };

  const handleEditSubmit = async () => {
    // consolest.log(editFormData.start_point,editFormData.end_point);
    const submit_forData = {
      start_point: editFormData.start_point,
      end_point: editFormData.end_point,
    };
    try {
      const response = await axios.put(
        `http://localhost:3002/api/userPath/${editFormData.id}`,
        submit_forData,
        {
          headers: {
            'x-api-key': 'your_secret_key',
          },
        },
      );
      setMessage('Route updated successfully');
      setShowEditModal(false);
      fetchData(); // Refresh the data after successful edit
    } catch (error) {
      setError('Failed to update route.');
    }
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { value: '' }]);
  };

  const handleRemoveField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const activeStatus = async (id) => {
    try {
      // Make an API call to update status for the given user ID
      const response = await axios.put(
        `http://localhost:3002/api/userPath/active/${id}`,
        {
          status: 1, // Update status to 0
        },
      );

      if (response.status === 200) {
        // Success, update the local status and open popup
        // setStatus(0);
        console.log('Status updated successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  const updateStatus = async (id) => {
    try {
      // Make an API call to update status for the given user ID
      const response = await axios.put(
        `http://localhost:3002/api/userPath/inactive/${id}`,
        {
          status: 0, // Update status to 0
        },
      );

      if (response.status === 200) {
        // Success, update the local status and open popup
        console.log('Status updated successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  return (
    <>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="E-Rickshaw Route"
          url="/dashboard"
          breadcrumb="E-Rickshaw Route"
        />
        {/* Add Route Form */}
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">
                  Add E-Rickshaw Route
                </h5>
              </div>
              {isSubmitted && (
                <SuccessPopup
                  isVisible={isVisible}
                  onClose={handleClosePopup}
                />
              )}
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row gx-3">
                    <div className="col-lg-3 col-sm-4 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="start_point">
                          Starting Point
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="start_point"
                          value={formData.start_point}
                          onChange={handleInputChange}
                          placeholder="Enter Starting Point"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-4 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="end_point">
                          End Point
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="end_point"
                          value={formData.end_point}
                          onChange={handleInputChange}
                          placeholder="Enter End Point"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="d-flex gap-2 justify-content-end">
                    <button type="reset" className="btn btn-danger me-2">
                      Reset
                    </button>
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Route List */}
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">
                  E-Rickshaw Route List
                </h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <GetTable
                      data={routes}
                      columns={columns}
                      title={'titl orrfiv oadii dioj diau'}
                    ></GetTable>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Route Modal */}
        <Modal
          show={showAddRouteModal}
          onHide={() => setShowAddRouteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Route</Modal.Title>
          </Modal.Header>
          <Modal.Body>{/* Add your form elements here */}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAddRouteModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Route
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Route Modal */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton className="bg-info text-light">
            <Modal.Title>
              <h6 className="text-light m-0">Edit Route</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="form-label" htmlFor="start_point">
                  Starting Point
                </label>
                <input
                  type="hidden"
                  className="form-control"
                  id="id"
                  value={editFormData.id}
                  onChange={handleEditInputChange}
                  placeholder="Enter Starting Point"
                />
                <input
                  type="text"
                  className="form-control"
                  id="start_point"
                  value={editFormData.start_point}
                  onChange={handleEditInputChange}
                  placeholder="Enter Starting Point"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="end_point">
                  End Point
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="end_point"
                  value={editFormData.end_point}
                  onChange={handleEditInputChange}
                  placeholder="Enter End Point"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="success" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* View Route Modal */}
        <Modal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          centered
        >
          <Modal.Header closeButton className="bg-info ">
            <Modal.Title className="text-light">
              <h6 className="h6">Route Details</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedData ? (
              <>
                <p>
                  <strong>Start Point:</strong> {selectedData.start_point}
                </p>
                <p>
                  <strong>End Point:</strong> {selectedData.end_point}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(selectedData.createdAt).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p>No route details available.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowViewModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Routes_path;

