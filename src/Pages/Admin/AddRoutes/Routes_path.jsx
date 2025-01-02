import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '../../../Component/SuccessPopup';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Brandcrump from '../../../Component/Brandcrump';
import GetTable from '../Table/GetTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:3002/api/userPath';
const API_KEY = 'your_secret_key';

const RoutesPath = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modals, setModals] = useState({
    view: false,
    add: false,
    edit: false,
  });
  const [formData, setFormData] = useState({
    start_point: '',
    end_point: '',
    id: '',
  });

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Start Point',
      selector: (row) => row.starting_point || row.start_point,
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
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <button type="button" className="btn btn-sm btn-info me-1" onClick={() => handleShow(row._id)}>View</button>
          <button type="button" className="btn btn-sm btn-warning me-1" onClick={() => handleShowEdit(row._id)}>Edit</button>
          <button type="button" className={`btn btn-sm ${row.status === 0 ? 'btn-success' : 'btn-danger'}`} onClick={() => toggleStatus(row._id, row.status)}>
            {row.status === 0 ? 'Active' : 'Inactive'}
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  const handleClosePopup = () => {
    setIsSubmitted(false);
    fetchData();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleModalToggle = (modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.start_point && formData.end_point) {
      try {
        const adminId = localStorage.getItem('user_id');
        await axios.post(`${API_URL}/add_routes`, { ...formData, admin_id: adminId }, { headers: { 'x-api-key': API_KEY } });
        toast.success('Route added successfully!', { autoClose: 3000 });
        setIsSubmitted(true);
        handleModalToggle('add');
        fetchData();
      } catch (error) {
        handleError(error);
        toast.error('Error adding route.', { autoClose: 3000 });
      }
    } else {
      toast.warn('Please fill in all fields.', { autoClose: 3000 });
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const adminId = localStorage.getItem('user_id');
      const response = await axios.get(`${API_URL}/admin/${adminId}`, { headers: { 'x-api-key': API_KEY } });
      setRoutes(response.data.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShow = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, { headers: { 'x-api-key': API_KEY } });
      setSelectedData(response.data);
      handleModalToggle('view');
    } catch (error) {
      handleError(error);
    }
  };

  const handleShowEdit = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, { headers: { 'x-api-key': API_KEY } });
      setFormData({ start_point: response.data.start_point || '', end_point: response.data.end_point || '', id: response.data._id || '' });
      handleModalToggle('edit');
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`${API_URL}/${formData.id}`, { start_point: formData.start_point, end_point: formData.end_point }, { headers: { 'x-api-key': API_KEY } });
      toast.success('Route updated successfully!', { autoClose: 3000 });
      handleModalToggle('edit');
      fetchData();
    } catch (error) {
      handleError(error);
      toast.error('Error updating route.', { autoClose: 3000 });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
      await axios.put(`${API_URL}/${newStatus === 1 ? 'active' : 'inactive'}/${id}`, { status: newStatus });
      toast.success(`Route Status updated successfully!`, { autoClose: 3000 });
      fetchData();
    } catch (error) {
      handleError(error);
      toast.error('Error updating route status.', { autoClose: 3000 });
    }
  };

  const handleError = (error) => {
    console.error(error);
    toast.error(error.response?.data?.message || 'An unexpected error occurred', { autoClose: 3000 });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="dashboard-main-body">
        <Brandcrump pageName="Dashboard" title="E-Rickshaw Route" url="/dashboard" breadcrumb="E-Rickshaw Route" />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">Add E-Rickshaw Route</h5>
              </div>
              {isSubmitted && <SuccessPopup isVisible={isSubmitted} onClose={handleClosePopup} />}
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row gx-3">
                    <div className="col-lg-3 col-sm-4 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="start_point">Starting Point</label>
                        <input type="text" className="form-control" id="start_point" value={formData.start_point} onChange={handleInputChange} placeholder="Enter Starting Point" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-4 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="end_point">End Point</label>
                        <input type="text" className="form-control" id="end_point" value={formData.end_point} onChange={handleInputChange} placeholder="Enter End Point" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="d-flex gap-2 justify-content-end">
                    <button type="reset" className="btn btn-danger me-2">Reset</button>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

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
                    <GetTable data={routes} columns={columns} title={'E-Rickshaw Route List'} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal show={modals.edit} onHide={() => handleModalToggle('edit')} centered>
          <Modal.Header closeButton className="bg-info text-light">
            <Modal.Title><h6 className="text-light m-0">Edit Route</h6></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="form-label" htmlFor="start_point">Starting Point</label>
                <input type="hidden" className="form-control" id="id" value={formData.id} onChange={handleInputChange} />
                <input type="text" className="form-control" id="start_point" value={formData.start_point} onChange={handleInputChange} placeholder="Enter Starting Point" />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="end_point">End Point</label>
                <input type="text" className="form-control" id="end_point" value={formData.end_point} onChange={handleInputChange} placeholder="Enter End Point" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleModalToggle('edit')}>Close</Button>
            <Button variant="success" onClick={handleEditSubmit}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modals.view} onHide={() => handleModalToggle('view')} centered>
          <Modal.Header closeButton className="bg-info">
            <Modal.Title className="text-light"><h6 className="h6">Route Details</h6></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedData ? (
              <>
                <p><strong>Start Point:</strong> {selectedData.start_point}</p>
                <p><strong>End Point:</strong> {selectedData.end_point}</p>
                <p><strong>Date:</strong> {new Date(selectedData.createdAt).toLocaleDateString()}</p>
              </>
            ) : (
              <p>No route details available.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleModalToggle('view')}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default RoutesPath;