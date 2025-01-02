import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessPopup from '../../../Component/SuccessPopup';

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    admin_name: '',
    email: '',
    password: '',
    zone_name: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks form submission status
  const [error, setError] = useState(''); // For handling API errors
  const [zones, setZones] = useState([]);
  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add form validation logic
    if (
      !formData.admin_name ||
      !formData.email ||
      !formData.password ||
      !formData.zone_name
    ) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Make an API call
      const response = await axios.post(
        'http://localhost:3002/api/admin/create',
        formData,
        {
          headers: {
            'x-api-key': 'your_secret_key',
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        setIsSubmitted(true); // Show success popup
        setFormData({
          admin_name: '',
          email: '',
          password: '',
          zone_name: '',
        });
        setError(''); // Clear any previous errors
      }
    } catch (err) {
      console.error('Error adding admin:', err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  // Handle popup close
  const handleClosePopup = () => {
    setIsSubmitted(false);
  };
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

  return (
    <>
      <div className="row gx-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-light m-0">Add Admin</h5>
            </div>

            {/* Success Popup */}
            {isSubmitted && (
              <SuccessPopup
                isVisible={isSubmitted}
                onClose={handleClosePopup}
              />
            )}

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row gx-3">
                  <div className="col-lg-3 col-sm-12 col-md-3 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zone_name">
                        Zone Name
                      </label>
                      <select
                        id="zone_name"
                        className="form-control"
                        value={formData.zone_name}
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
                  {/* Admin Name */}
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="admin_name">
                        Admin Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="admin_name"
                        value={formData.admin_name}
                        onChange={handleInputChange}
                        placeholder="Enter Admin Name"
                      />
                    </div>
                  </div>

                  {/* Email */}
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
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>

                  {/* Password */}
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
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex gap-2 justify-content-end">
                  <button
                    type="reset"
                    className="btn btn-danger me-2"
                    onClick={() =>
                      setFormData({
                        admin_name: '',
                        email: '',
                        password: '',
                        zone: '',
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

export default AddAdmin;
