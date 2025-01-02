import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import Input_ from 'postcss/lib/input';

const VechileRegistration3 = ({ ownerId,refId, increment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    dob: '',
    gender: '',
    aadhar_number: '',
    voter_id_number: '',
    driving_license_number: '',
    reference_id: refId,
    added_by: 'admin',
    added_id: localStorage.getItem("user_id"),
    owner_id: ownerId
  });
  const [files, setFiles] = useState({
    aadhar_image: null,
    voter_image: null,
    driving_license: null,
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    // Append file data
    Object.keys(files).forEach(key => {
      formDataToSend.append(key, files[key]);
    });

    try {
      const response = await axios.post('http://localhost:3002/api/driver/create', formDataToSend, {
        headers: {
          'x-api-key': 'your_secret_key', // Replace with your actual API key
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        toast.success('Driver registered successfully!');
        increment(); // Call increment function if needed
        localStorage.setItem('vehicleId', vehicleId)
      }
    } catch (error) {
      toast.error('Error registering driver.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className='col-md-12'>
            <div className="mb-3">
                <label htmlFor="reference_id" className="form-label">Reference ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="reference_id"
                  disabled
                  value={refId}
                  name="reference_id"
                />
              </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div> 
          <div className="col-md-6">  
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div> 
          <div className="col-md-6">  
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div> 
          <div className="col-md-6">  
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>  
            </div> 
            <div className="col-md-6">  
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">  
              <div className="mb-3">
                <label htmlFor="profile_pic" className="form-label">Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  id="profile_pic"
                  name="profile_pic"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          <div className="col-md-6">  
            <div className="mb-3">
              <label htmlFor="aadhar_number" className="form-label">Aadhar Number</label>
              <input
                type="text"
                className="form-control"
                id="aadhar_number"
                name="aadhar_number"
                value={formData.aadhar_number}
                onChange={handleInputChange}
                required
              />
            </div>
          </div> 
            <div className="col-md-6">  
            <div className="mb-3">
              <label htmlFor="aadhar_image" className="form-label">Aadhar Image</label>
              <input
                type="file"
                className="form-control"
                id="aadhar_image"
                name="aadhar_image"
                onChange={handleFileChange}
                required
              />
            </div>
            </div>
            <div className="col-md-6">  
                <div className="mb-3">
                  <label htmlFor="driving_license_number" className="form-label">Driving License Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="driving_license_number"
                    name="driving_license_number"
                    value={formData.driving_license_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div> 
              <div className="col-md-6">  
                <div className="mb-3">
                  <label htmlFor="driving_license" className="form-label">Driving License</label>
                  <input
                    type="file"
                    className="form-control"
                    id="driving_license"
                    name="driving_license"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className="mb-3">
                  <label htmlFor="voter_id_number" className="form-label">Voter ID Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="voter_id_number"
                    name="voter_id_number"
                    value={formData.voter_id_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className="mb-3">
                <label htmlFor="voter_image" className="form-label">Voter Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="voter_image"
                  name="voter_image"
                  onChange={handleFileChange}
                />
              </div>
              </div>
              <div className='col-md-6'>
                  <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
              </div>
              <div className='col-md-6'>
              <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
              </div>
              <div className='col-md-6'>
              <div className="mb-3">
              <label htmlFor="pin" className="form-label">PIN Code</label>
              <input
                type="text"
                className="form-control"
                id="pin"
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
              />
            </div>
              </div>
          </div> 
        <button type="submit" className="btn btn-success">Register Driver</button>
      </form>
    </div>
  );
};

export default VechileRegistration3;