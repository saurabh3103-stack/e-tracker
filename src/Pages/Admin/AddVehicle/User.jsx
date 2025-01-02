import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import Loader from '../../../Component/Loader'; // Assuming you have a Loader component
import Brandcrump from '../../../Component/Brandcrump';
import { Modal, Button, Tabs, Tab, Card, Image } from 'react-bootstrap';
import './RouteMap.css';
import GetTable from '../../SubAdmin/Table/GetTable';
import { toast, ToastContainer } from 'react-toastify';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(null); // Data for the selected ID
  const [show, setShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [route, setroutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [assignQR, setAssignQR] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState([]);
  const [getRoute, getRouteData] = useState('');
  const startPoint = 'Start Point';
  const endPoint = 'End Point';
  const stops = ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4', 'Stop 5'];
  const imageUrl = 'http://localhost:5173/backend/src/assets/upload/';

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/users/', {
        headers: {
          'x-api-key': 'your_secret_key', // Replace with your actual API key
        },
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false); // Turn off loading once data is fetched
    }
  };

  useEffect(() => {
    fetchData(); // Call the function inside useEffect
  }, []);

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1, // Dynamically generates serial numbers
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'ID',
      selector: (row) => row.e_rickshaw,
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Rickshaw Photo',
      selector: (row) => (
        <img src={imageUrl + row.rickshaw_photo} className='img-fluid' style={{ height: '120px', width: '120px' }} />
      ),
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Rickshaw Details',
      selector: (row) => (
        <div>
          <strong>Rickshaw Number: </strong>{row.e_rickshaw}<br />
          <strong>Chassis Number: </strong>{row.chassis}<br />
          <strong>Fitness Expiry: </strong>{row.fitness}
        </div>
      ),
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Owner Details',
      selector: (row) => (
        <div>
          <strong>Name: </strong>{row.owner_name}<br />
          <strong>Email: </strong>{row.email}<br />
          <strong>Mobile: </strong>{row.phone_owner}<br />
          <strong>Address: </strong>{row.address_line_f} {row.address_line_t}
        </div>
      ),
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Route',
      selector: (row) => row.e_ricksaw_route || 'No route assigned',
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Qr Status',
      selector: (row) => row.qr_assing_statu,
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <button type="button" className="btn btn-sm btn-info me-1" onClick={() => handleShow(row._id)}>
            View
          </button>
          {row.e_ricksaw_route ? (
            <button type="button" className="btn btn-sm btn-success me-1" onClick={() => handleModalOpen(row._id)}>
              Update Route
            </button>
          ) : (
            <button type="button" className="btn btn-sm btn-warning me-1" onClick={() => handleModalOpen(row._id)}>
              Assign Route
            </button>
          )}
 <button
          className={`btn btn-sm ${
            row.status === "active" ? "btn-success" : "btn-danger"
          }`}
          onClick={() => handleStatus(row._id, row.status)} // Pass current status here
        >
          {row.status}
        </button>
        </div>
      ),
      sortable: false,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];



  const handleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axios.put(
        `http://localhost:3002/api/users/update-status/${id}`,
        { status: newStatus },
        {
          headers: {
            "x-api-key": "your_secret_key",
          },
        }
      );
      fetchData();
      toast.success(`Status changed to ${newStatus} successfully!`, { autoClose: 3000 });
      
    } catch (error) {
      toast.error("Failed to update status. Please try again.", { autoClose: 3000 });
    }
  };
  
  const handleShow = (id) => {
    axios
      .get(`http://localhost:3002/api/users/${id}`, {
        headers: {
          'x-api-key': 'your_secret_key', // Replace with your actual API key
        },
      }) // Fetch data by ID
      .then((response) => {
        setSelectedData(response.data);
        setShow(true); // Show modal
      })
      .catch((error) => {
        console.error('Error fetching data by ID:', error);
      });
  };

  const handleClose = () => setShow(false);

  
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3002/api/userPath/',
          {
            headers: {
              'x-api-key': 'your_secret_key', // Replace with your actual API key
            },
          },
        );
        setroutes(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoute();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData); // Log the form data after the change
  };

  const handleModalOpen = (userId) => {
    setSelectedUserId(userId); // Set the selected user's ID
    setShowModal(true); // Show modal
  };

  const [routeData, setRouteData] = useState({}); // State to store route data for each route

  // Function to fetch route details by routeId
  const getRouteId = async (routeId) => {
    if (routeId && !routeData[routeId]) {
      try {
        let headersList = {
          Accept: '*/*',
          'x-api-key': 'your_secret_key',
        };
        let reqOptions = {
          url: `http://localhost:3002/api/userPath/${routeId}`,
          method: 'GET',
          headers: headersList,
        };

        let response = await axios.request(reqOptions);
        setRouteData((prevData) => ({
          ...prevData,
          [routeId]: response.data, // Set route data for this specific routeId
        }));
        console.log('Routes', response.data);
      } catch (error) {
        console.error('Error fetching route details:', error);
      }
    }
  };

  // Function to close the modal
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUserId(null); // Reset user ID when closing modal
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedUserId);
    let id = selectedUserId;
    console.log(formData);
    try {
      // Make an API call to update status for the given user ID
      const response = await axios.put(
        `http://localhost:3002/api/users/assign_route/${id}`,
        formData,
      );
      if (response.status === 200) {
        console.log('Status updated successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
    // handleModalClose(); // Close modal after submit
  };
  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div class="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Vehicle"
          url="/dashboard"
          breadcrumb="Vehicle"
        />
        <div class="card basic-data-table">
          <div
            class="card-header bg-primary text-white"
            style={{ padding: '.5rem 1rem' }}
          >
            <div class="row">
              <div class="col-6">
                <h5
                  class="card-title mb-0 text-light"
                  style={{ paddingTop: '.6rem !important', marginTop: '2%' }}
                >
                  Vehicle List
                </h5>
              </div>
              <div class="col-6">
                <Link to={'/admin/add_user'} class="btn btn-success float-end">
                  Add Vehicle
                </Link>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="dt-container dt-empty-footer">
              <div class="table-responsive dt-layout-row dt-layout-table">
                <div class="dt-layout-cell ">
                <GetTable
  data={users}
  columns={columns}
  title="E-Rickshaw Users"
/>
                  <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton className="bg-info text-light">
                      <Modal.Title className="text-center fade-in">
                        <h6 className="h6 m-0">E-Rickshaw Details</h6>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-light">
                      {loading ? (
                        <p>Loading...</p>
                      ) : selectedData ? (
                        <div className={`bg-light`}>
                          <div className="container">
                            <div className="row d-flex">
                              <div className="col-md-4 d-flex">
                                <Card className="shadow-sm hover-shadow fade-in-left flex-fill">
                                  <Card.Header className="bg-primary text-white">
                                    <h6 className="text-light card-title m-0">
                                      E-Rickshaw Photo
                                    </h6>
                                  </Card.Header>
                                  <Card.Body className="text-center">
                                    <Image
                                      src={
                                        imageUrl + selectedData.rickshaw_photo
                                      }
                                      alt="E-Rickshaw"
                                      width={192}
                                      height={192}
                                    />
                                  </Card.Body>
                                </Card>
                              </div>

                              <div className="col-md-8 d-flex">
                                <Card className="shadow-sm hover-shadow fade-in-right flex-fill">
                                  <Card.Header className="bg-success text-white">
                                    <h6 className="h6 text-light card-title m-0">
                                      {' '}
                                      Vehicle Information &nbsp;(
                                      {selectedData.e_rickshaw})
                                    </h6>
                                  </Card.Header>
                                  <Card.Body>
                                    <div className="row">
                                      <div className="col-md-12">
                                        <p className="d-flex align-items-center">
                                          <i className="bi bi-truck text-success me-2"></i>{' '}
                                          <strong>E-Rickshaw Number:</strong>{' '}
                                          &nbsp;{selectedData.e_rickshaw}
                                        </p>
                                      </div>
                                      <div className="col-md-6">
                                        <p className="d-flex align-items-center">
                                          <i className="bi bi-file-text text-success me-2"></i>{' '}
                                          <strong>Chassis:</strong> &nbsp;
                                          {selectedData.chassis}
                                        </p>
                                      </div>
                                      <div className="col-md-6">
                                        <p className="d-flex align-items-center">
                                          <i className="bi bi-calendar text-success me-2"></i>{' '}
                                          <strong>Fitness Expiry:</strong>{' '}
                                          &nbsp;{selectedData.fitness}
                                        </p>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="route-container">
                                          <div className="line"></div>
                                          {/* Start Point */}
                                          <div className="stop start-point">
                                            <div className="stop-marker"></div>
                                            <div className="stop-name">
                                              {startPoint}
                                            </div>
                                          </div>

                                          {stops.map((stop, index) => (
                                            <div key={index} className="stop">
                                              <div className="stop-marker"></div>
                                              <div className="stop-name">
                                                {stop}
                                              </div>
                                            </div>
                                          ))}

                                          {/* End Point */}
                                          <div className="stop end-point">
                                            <div className="stop-marker"></div>
                                            <div className="stop-name">
                                              {endPoint}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </div>
                            </div>

                            <Tabs
                              defaultActiveKey="owner"
                              className="mt-4 custom-tabs fade-in-up"
                            >
                              <Tab
                                eventKey="owner"
                                title="Owner Details"
                                className="bg-light"
                              >
                                <Card className="shadow-sm hover-shadow mt-3">
                                  <Card.Header className="bg-warning text-white">
                                    <h6 className="card-title text-light m-0">
                                      Owner Information
                                    </h6>
                                  </Card.Header>
                                  <Card.Body>
                                    <div className="row">
                                      <div className="col-md-3 text-center">
                                        <Image
                                          src={
                                            imageUrl + selectedData.owner_photo
                                          }
                                          roundedCircle
                                          alt="Owner"
                                          width={128}
                                          height={128}
                                        />
                                      </div>
                                      <div className="col-md-9">
                                        <div className="row">
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-person text-warning me-2"></i>
                                              <strong>Name:</strong> &nbsp;
                                              {selectedData.owner_name}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-telephone text-warning me-2"></i>
                                              <strong>Phone:</strong> &nbsp;
                                              {selectedData.owner_name}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-envelope text-warning me-2"></i>
                                              <strong>Email:</strong> &nbsp;
                                              {selectedData.email}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-credit-card text-warning me-2"></i>
                                              <strong>Aadhar Number:</strong>{' '}
                                              &nbsp;{selectedData.addhar_number}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-credit-card text-warning me-2"></i>
                                              <strong>Driving Licence:</strong>{' '}
                                              &nbsp;{selectedData.owner_dl}
                                            </p>
                                          </div>
                                          <div className="col-md-12">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-map text-warning me-2"></i>
                                              <strong>Address:</strong> &nbsp;
                                              {selectedData.address_line_f}{' '}
                                              &nbsp;
                                              {selectedData.address_line_t}{' '}
                                              &nbsp;{selectedData.city} &nbsp;
                                              {selectedData.state} &nbsp;{' '}
                                              {selectedData.pin_code}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Tab>
                              <Tab
                                eventKey="driver"
                                title="Driver Details"
                                className="bg-light"
                              >
                                <Card className="shadow-sm hover-shadow mt-3">
                                  <Card.Header className="bg-warning text-white">
                                    <h6 className="card-title text-light m-0">
                                      Driver Information
                                    </h6>
                                  </Card.Header>
                                  <Card.Body>
                                    <div className="row">
                                      <div className="col-md-3 text-center">
                                        <Image
                                          src={imageUrl + selectedData.d_photo}
                                          roundedCircle
                                          alt="Driver"
                                          width={128}
                                          height={128}
                                        />
                                      </div>
                                      <div className="col-md-9">
                                        <div className="row">
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-person-check text-purple me-2"></i>
                                              <strong>Name:</strong> &nbsp;
                                              {selectedData.driver_name}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-telephone text-purple me-2"></i>
                                              <strong>Phone:</strong> &nbsp;
                                              {selectedData.d_phone}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-credit-card text-purple me-2"></i>
                                              <strong>Aadhar Number:</strong>{' '}
                                              &nbsp;
                                              {selectedData.d_addhar_number}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-credit-card text-warning me-2"></i>
                                              <strong>Driving Licence:</strong>{' '}
                                              &nbsp;{selectedData.d_dl_number}
                                            </p>
                                          </div>
                                          <div className="col-md-12">
                                            <p className="d-flex align-items-center">
                                              <i className="bi bi-map text-purple me-2"></i>
                                              <strong>Address:</strong> &nbsp;
                                              {selectedData.d_address_line_f}{' '}
                                              &nbsp;
                                              {selectedData.d_address_line_t}{' '}
                                              &nbsp;{selectedData.d_city} &nbsp;
                                              {selectedData.d_state} &nbsp;
                                              {selectedData.d_pin_code}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Tab>
                            </Tabs>
                          </div>
                        </div>
                      ) : (
                        <p>No data found</p>
                      )}
                      <div className="float-end mt-4">
                        <Button variant="danger" onClick={handleClose}>
                          Close
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                  {showModal && (
                    <div
                      className="modal fade show d-block"
                      tabIndex="-1"
                      aria-labelledby="routeModalLabel"
                      aria-hidden="true"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          {/* Modal header */}
                          <div className="modal-header bg-info">
                            <h6 className="modal-title" id="routeModalLabel">
                              Update Route
                            </h6>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={handleModalClose}
                              aria-label="Close"
                            ></button>
                          </div>

                          {/* Modal form */}
                          <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                              <div className="mb-3">
                                <label
                                  htmlFor="routeSelect"
                                  className="form-label"
                                >
                                  Select Route
                                </label>
                                <select
                                  className="form-select"
                                  name="e_ricksaw_route"
                                  onChange={handleInputChange}
                                  value={formData.e_ricksaw_route}
                                >
                                  <option value="">-- Choose a route --</option>
                                  {route.map((r) => (
                                    <option key={r._id} value={r._id}>
                                      {r.start_point} - {r.end_point}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="qrSelect"
                                  className="form-label"
                                >
                                  Assign QR
                                </label>
                                <select
                                  className="form-select"
                                  name="qr_assing_statu"
                                  onChange={handleInputChange}
                                  value={formData.qr_assing_statu}
                                >
                                  <option value="">-- Choose --</option>
                                  <option value="0">No</option>
                                  <option value="1">Yes</option>
                                </select>
                              </div>

                              {/* Conditionally show QR input field if "Yes" is selected */}
                              {formData.qr_assing_statu === '1' && (
                                <div className="mb-3">
                                  <label htmlFor="qrID" className="form-label">
                                    Enter QR Code
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="qrID"
                                    value={formData.qrID}
                                    onChange={handleInputChange} // Update QR input value
                                  />
                                </div>
                              )}
                            </div>

                            {/* Modal footer with buttons */}
                            <div className="modal-footer bg-light">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleModalClose}
                              >
                                Close
                              </button>
                              <button type="submit" className="btn btn-success">
                                Submit Route
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default Users;
