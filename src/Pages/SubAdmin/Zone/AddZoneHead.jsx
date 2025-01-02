import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessPopup from '../../../Component/SuccessPopup';

const AddZoneHead = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    aadhaar_number: '',
    address: '',
    designation: '',
    mobile_number: '',
    email: '',
    zone_id: '',
    password: '',
  });

  const [isVisible, setIsVisible] = useState(false); // Controls popup visibility
  const [error, setError] = useState('');
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/zones', {
          headers: {
            'x-api-key': 'your_secret_key',
          },
        });
        if (response.status === 200) {
          setZones(response.data);
        } else {
          setError('Failed to fetch zone names.');
        }
      } catch (error) {
        console.error('API Error:', error);
        setError(
          'Failed to fetch zone names. Please check your connection or API endpoint.',
        );
      }
    };

    fetchZones();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.aadhaar_number ||
      !formData.zone_id ||
      !formData.password
    ) {
      setError('Name, Aadhaar, Zone, and Password are required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3002/api/zonehead/register',
        formData,
        {
          headers: {
            'x-api-key': 'your_secret_key',
          },
        },
      );

      if (response.status === 200) {
        setError(''); // Clear any error messages
        setIsVisible(true); // Show the success popup
        setFormData({
          name: '',
          dob: '',
          aadhaar_number: '',
          address: '',
          designation: '',
          mobile_number: '',
          email: '',
          password: '',
          zone_id: '',
        }); // Reset form data
      } else {
        setError('Failed to add zone head. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
      setError(
        'Failed to add zone head. Please check your connection or API endpoint.',
      );
    }
  };

  // Handle success popup close
  const handleClosePopup = () => {
    setIsVisible(false); // Hide popup
  };

  return (
    <>
      <div className="row gx-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-light m-0">Add Zone Head</h5>
            </div>

            {isVisible && (
              <SuccessPopup isVisible={isVisible} onClose={handleClosePopup} />
            )}
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row gx-3">
                  {/* Zone Name Dropdown */}
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zone_id">
                        Zone Name
                      </label>
                      <select
                        id="zone_id"
                        className="form-control"
                        value={formData.zone_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Zone</option>
                        {zones.map((zone) => (
                          <option key={zone._id} value={zone._id}>
                            {zone.zone_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Zone Head Details */}
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Zone Head Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="mobile_number">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleInputChange}
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="dob">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="aadhaar_number">
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="aadhaar_number"
                        value={formData.aadhaar_number}
                        onChange={handleInputChange}
                        placeholder="Enter Aadhaar Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="designation">
                        Designation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="Enter Designation"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-sm-12 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="address">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex gap-2 justify-content-end">
                  <button
                    type="reset"
                    className="btn btn-danger me-2"
                    onClick={() =>
                      setFormData({
                        name: '',
                        dob: '',
                        aadhaar_number: '',
                        address: '',
                        designation: '',
                        mobile_number: '',
                        email: '',
                        password: '', // Reset the password field
                        zone_id: '',
                      })
                    }
                  >
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
    </>
  );
};

export default AddZoneHead;
