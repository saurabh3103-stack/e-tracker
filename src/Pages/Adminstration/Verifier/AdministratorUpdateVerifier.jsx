import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessPopup from '../../../Component/SuccessPopup';
import Brandcrump from '../../../Component/Brandcrump';
import { useLocation } from 'react-router-dom';

const AdministratorUpdateVerifier = () => {
  const location = useLocation();
  const selectedData = location.state;

  const [formData, setFormData] = useState({
    zone_id: '',
    zone_head: '',
    name: '',
    mobile_number: '',
    email: '',
    designation: '',
    dob: '',
    aadhaar_number: '',
    address: '',
    photo: null,
    police_stationname: '',
    police_id: '',
    password: '',
    added_by: 'admin',
    added_id: localStorage.getItem('user_id'),
  });

  const [zones, setZones] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedData) {
      setFormData({
        zone_id: selectedData.zone_id || '',
        zone_head: selectedData.zone_head || '',
        name: selectedData.name || '',
        mobile_number: selectedData.mobile_number || '',
        email: selectedData.email || '',
        designation: selectedData.designation || '',
        dob: selectedData.dob || '',
        aadhaar_number: selectedData.aadhaar_number || '',
        address: selectedData.address || '',
        photo: selectedData.photo || null,
        police_stationname: selectedData.police_stationname || '',
        police_id: selectedData.police_id || '',
        password: selectedData.password || '',
        added_by: 'admin',
        added_id: localStorage.getItem('user_id'),
      });
    }
  }, [selectedData]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/zones', {
          headers: { 'x-api-key': 'your_secret_key' },
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
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    for (const key in formData) {
      updatedData.append(key, formData[key]);
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/api/verifier/update/${selectedData._id}`,
        updatedData,
        { headers: { 'x-api-key': 'your_secret_key' } },
      );
      if (response.status === 200) {
        setIsVisible(true);
      }
    } catch (err) {
      setError('Failed to update the verifier. Please try again.');
    }
  };

  const handleClosePopup = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Update Verifier"
          url="/dashboard"
          breadcrumb="update Verifier"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">Update Verifier</h5>
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
                    {[
                      {
                        label: 'Zone Name',
                        id: 'zone_id',
                        type: 'select',
                        options: zones,
                      },
                      { label: 'Zone Head', id: 'zone_head', type: 'text' },
                      { label: 'Name', id: 'name', type: 'text' },
                      { label: 'Mobile', id: 'mobile_number', type: 'text' },
                      { label: 'Email', id: 'email', type: 'email' },
                      { label: 'Photo', id: 'photo', type: 'file' },
                      { label: 'Designation', id: 'designation', type: 'text' },
                      { label: 'Date of Birth', id: 'dob', type: 'date' },
                      {
                        label: 'Aadhaar Number',
                        id: 'aadhaar_number',
                        type: 'text',
                      },
                      { label: 'Address', id: 'address', type: 'text' },
                      {
                        label: 'Police Station Name',
                        id: 'police_stationname',
                        type: 'text',
                      },
                      { label: 'Police ID', id: 'police_id', type: 'text' },
                      { label: 'Password', id: 'password', type: 'password' },
                    ].map(({ label, id, type, options }) => (
                      <div key={id} className="col-lg-6 col-sm-12">
                        <div className="mb-3">
                          <label className="form-label" htmlFor={id}>
                            {label}
                          </label>
                          {type === 'select' ? (
                            <select
                              id={id}
                              className="form-control"
                              value={formData[id]}
                              onChange={handleInputChange}
                            >
                              <option value="">Select {label}</option>
                              {options &&
                                options.map((option) => (
                                  <option key={option._id} value={option._id}>
                                    {option.zone_name}
                                  </option>
                                ))}
                            </select>
                          ) : (
                            <input
                              type={type}
                              className="form-control"
                              id={id}
                              value={type === 'file' ? undefined : formData[id]}
                              onChange={
                                type === 'file'
                                  ? handleFileChange
                                  : handleInputChange
                              }
                              placeholder={`Enter ${label}`}
                              accept={type === 'file' ? 'image/*' : undefined}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Update Verifier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdministratorUpdateVerifier;

