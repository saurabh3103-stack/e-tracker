import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessPopup from '../../../Component/SuccessPopup';
import Brandcrump from '../../../Component/Brandcrump';
import { useNavigate } from 'react-router-dom';

const AddVerifier = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    zone_name: '',
    zone_head: '',
    name: '',
    mobile: '',
    email: '',
    designation: '',
    dob: '',
    aadhaar_number: '',
    address: '',
    photo: null,
    police_name: '',
    police_id: '',
    password: '', // Added password field
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      console.log('Selected file:', file); // Log the selected file
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.zone_name ||
      !formData.zone_head ||
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.designation ||
      !formData.photo ||
      !formData.password
    ) {
      setError('All fields are required.');
      return;
    }

    // Create a plain object instead of FormData
    const data = {
      zone_name: formData.zone_name,
      zone_head: formData.zone_head,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      designation: formData.designation,
      dob: formData.dob,
      aadhaar_number: formData.aadhaar_number,
      address: formData.address,
      photo: formData.photo, // This will still be a file object
      police_name: formData.police_name,
      police_id: formData.police_id,
      password: formData.password,
    };

    // Navigate with the data
    if (data) {
      navigate(`/preview-verifier`, { state: { data } }); // Correctly pass the data inside the state object
    }
  };

  const handleClosePopup = () => {
    setIsVisible(false);
    setIsSubmitted(false);
  };

  return (
    <>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Add Verifier"
          url="/dashboard"
          breadcrumb="Add Verifier"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">Add Verifier</h5>
              </div>
              {isVisible && (
                <SuccessPopup
                  isVisible={isVisible}
                  onClose={handleClosePopup}
                />
              )}

              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="row gx-3">
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
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
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="zone_head">
                          Zone Head
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zone_head"
                          value={formData.zone_head}
                          onChange={handleInputChange}
                          placeholder="Enter Zone Head"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row gx-3">
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
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
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="mobile">
                          Mobile
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter Mobile Number"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
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
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="photo">
                          Upload Photo
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="photo"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
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
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
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
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
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
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="address">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter Address"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="police_name">
                          Police Station Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="police_name"
                          value={formData.police_name}
                          onChange={handleInputChange}
                          placeholder="Enter Police Station Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="police_id">
                          Police Station ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="police_id"
                          value={formData.police_id}
                          onChange={handleInputChange}
                          placeholder="Enter Police Station ID"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6 col-12">
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
                    <div className="col-sm-12">
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVerifier;
