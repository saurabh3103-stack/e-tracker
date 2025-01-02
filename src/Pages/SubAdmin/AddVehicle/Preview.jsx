import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SuccessPopup from '../../../Component/SuccessPopup';
import Brandcrump from '../../../Component/Brandcrump';
function Preview() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Initialize loading state
  const imageUrl = 'http://localhost:5173/backend/src/assets/upload/';
  const [isVisible, setisVisible] = useState(false);

  const status = 0;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/users/user/${userId}/${status}`,
        );
        setUserData(response.data.user);
        setLoading(false);
        console.log(response.data.user);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user data');
        setLoading(false); // Stop loading on error
      }
    };
    fetchUserData();
  }, []);

  const navigate = useNavigate();
  const handleClosePopup = () => {
    setIsSubmitted(false); // Close the popup
    navigate('/vehicle'); // Navigate to the dashboard
  };
  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3002/api/users/update_status/${userId}`,
      );
      setMessage(response.data.message);
      setError('');
      setIsSubmitted(true);
      setisVisible(true);
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status.');
      setMessage('');
    }
  };

  return (
    <>
      <div className="dashboard-main-body">
        <div>
          <div>
            <Brandcrump
              pageName="Dashboard"
              title="Preview E-Rickshaw Details"
              url="/dashboard"
              breadcrumb="E-Rickshaw Details"
            />
            {userData ? (
              <div className="row gx-3">
                <div className="col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Owner Details</h5>
                    </div>
                    <form>
                      {isSubmitted && (
                        <SuccessPopup
                          isVisible={isVisible}
                          onClose={handleClosePopup}
                        />
                      )}{' '}
                      {/* Popup shows on submission */}
                      <div className="card-body">
                        <div className="row gx-3">
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a1">
                                Owner Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="owner_name"
                                placeholder="Enter Owner fullname"
                                value={userData.owner_name}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a2">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={userData.email}
                                disabled
                                placeholder="Enter Owner email address"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a3">
                                Phone
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="phone_owner"
                                placeholder="Enter Owner phone number"
                                value={userData.phone_owner}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a6">
                                Addhar Card Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.addhar_number}
                                disabled
                                id="addhar_number"
                                placeholder="Enter Addhar Card Number"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                Owner DL
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="owner_dl"
                                disabled
                                placeholder="Enter Owner DL"
                              />
                            </div>
                          </div>

                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a4">
                                E-Rickshaw Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.e_rickshaw}
                                disabled
                                id="e_rickshaw"
                                placeholder="Enter E-Rickshaw Number"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a5">
                                Chassis Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.chassis}
                                disabled
                                id="chassis"
                                placeholder="Enter Chassis Number"
                              />
                            </div>
                          </div>

                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                Address Line 1
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.address_line_f}
                                disabled
                                id="address_line_f"
                                placeholder="Enter Address Line 1"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                Address Line 2
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                disabled
                                id="address_line_t"
                                value={userData.address_line_t}
                                placeholder="Enter Address Line 2"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                City
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.city}
                                disabled
                                id="city"
                                placeholder="Enter City Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                State
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.state}
                                disabled
                                id="state"
                                placeholder="Enter State Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                Pin Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.pin_code}
                                disabled
                                id="pin_code"
                                placeholder="Enter Pin Code"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Row ends */}
                      </div>
                      <div className="card-header">
                        <h5 className="card-title">Driver Details</h5>
                      </div>
                      <div className="card-body">
                        <div className="row gx-3">
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a1">
                                Driver Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.driver_name}
                                disabled
                                id="driver_name"
                                placeholder="Enter Fullname"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a3">
                                Phone
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                value={userData.d_phone}
                                disabled
                                id="d_phone"
                                placeholder="Enter Phone Number"
                              />
                            </div>
                          </div>

                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a6">
                                Addhar Card Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.d_addhar_number}
                                disabled
                                id="d_addhar_number"
                                placeholder="Enter Addhar Card Number"
                              />
                            </div>
                          </div>

                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                Driver DL
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.d_dl_number}
                                disabled
                                id="d_dl_number"
                                placeholder="Enter Driver DL Number"
                              />
                            </div>
                          </div>

                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                Address Line 1
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.d_address_line_f}
                                disabled
                                id="d_address_line_f"
                                placeholder="Enter Address Line 1"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                Address Line 2
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                disabled
                                id="d_address_line_t"
                                value={userData.d_address_line_t}
                                placeholder="Enter Address Line 2"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                City
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.d_city}
                                disabled
                                id="d_city"
                                placeholder="Enter City Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                State
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.d_state}
                                disabled
                                id="d_state"
                                placeholder="Enter State Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-4 col-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="a8">
                                Pin Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={userData.d_pin_code}
                                disabled
                                id="d_pin_code"
                                placeholder="Enter Pin Code"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row gx-3">
                          <div className="col-lg col-sm-4 col-12">
                            <label className="form-label">Owner Photo</label>
                            <img
                              src={imageUrl + userData.owner_photo}
                              class="img-fluid"
                            />
                          </div>
                          <div className="col-lg col-sm-4 col-12">
                            <label className="form-label">Owner Addhar</label>
                            <img
                              src={imageUrl + userData.addhar_image}
                              class="img-fluid"
                            />
                          </div>
                          <div className="col-lg col-sm-4 col-12">
                            <label className="form-label">Owner Dl</label>
                            <img
                              src={imageUrl + userData.owner_dl_image}
                              class="img-fluid"
                            />
                          </div>
                          <div className="col-lg col-sm-4 col-12">
                            <label className="form-label">Rikshaw Photo</label>
                            <img
                              src={imageUrl + userData.rickshaw_photo}
                              class="img-fluid"
                            />
                          </div>
                          <div className="col-lg col-sm-4 col-12">
                            <label className="form-label">Driver Photo</label>
                            <img
                              src={imageUrl + userData.d_photo}
                              class="img-fluid"
                            />
                          </div>
                          <div className="col-lg col-sm-4 col-12">
                            <label className="form-label">Driver Addhar</label>
                            <img
                              src={imageUrl + userData.d_addhar_image}
                              class="img-fluid"
                            />
                          </div>
                          <div className="col-lg col-sm-4 col-12">
                            <label className="form-label">Driver DL</label>
                            <img
                              src={imageUrl + userData.driver_dl_image}
                              class="img-fluid"
                            />
                          </div>
                        </div>
                        {/* Row ends */}
                      </div>
                      <div className="card-footer">
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(-1)}
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={updateStatus}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <p>No user data found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;
