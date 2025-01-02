import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

import axios from 'axios';
import { toast } from 'react-toastify';

const VehicleRegistration4 = ({refId}) => {

  const { vehicleId,registration_number } = useContext(AppContext);

 
  const [formData, setFormData] = useState({
    vehicle_id:vehicleId|| '',
    rc: registration_number,
    insurance_date: '',
    insurance_exp_date: '',
    fitness_date: '',
    fitness_exp_date: '',
    pollution_date: '',
    pollution_exp_date: '',
    added_by:'admin',
    added_id:localStorage.getItem("user_id")
  });

  const [files, setFiles] = useState({
    insurance_image: null,
    fitness_image: null,
    pollution_image: null,
    ownership_image: null,
    photos: [],

  });

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === 'photos') {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: Array.from(selectedFiles),
      }));
    } else {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: selectedFiles[0] || null, // Handle case where no file is selected
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    

    // Append file data
    Object.keys(files).forEach((key) => {
      if (key === 'photos') {
        files[key].forEach((file) => {
          formDataToSend.append(key, file);
        });
      } else {
        formDataToSend.append(key, files[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:3002/api/vehicle-document/create', formDataToSend, {
        headers: {
          'x-api-key': 'your_secret_key', // Replace with your actual API key
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Vehicle document created successfully!');
        // Reset form
        setFormData({
          vehicle_id: vehicleId|| '',
          rc: '',
          insurance_date: '',
          insurance_exp_date: '',
          fitness_date: '',
          fitness_exp_date: '',
          pollution_date: '',
          pollution_exp_date: '',
        });
        setFiles({
          insurance_image: null,
          fitness_image: null,
          pollution_image: null,
          ownership_image: null,
          photos: [],
        });
      }
    } catch (error) {
      toast.error('Error creating vehicle document: ' + (error.response?.data?.message || 'Unknown error'));
      console.error(error);
    }
  };
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <label>Reference ID</label>
            <input type="text" disabled value={refId} className='form-control'/>
          </div>
          <div className='col-md-6'>
            <label>RC Number</label>
            <input type="text" disabled value={registration_number} className='form-control'/>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="insurance_date" className="form-label">Insurance Date</label>
              <input
                type="date"
                id="insurance_date"
                name="insurance_date"
                className="form-control"
                value={formData.insurance_date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="insurance_exp_date" className="form-label">Insurance Expiry Date</label>
              <input
                type="date"
                id="insurance_exp_date"
                name="insurance_exp_date"
                className="form-control"
                value={formData.insurance_exp_date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="fitness_date" className="form-label">Fitness Date</label>
              <input
                type="date"
                id="fitness_date"
                name="fitness_date"
                className="form-control"
                value={formData.fitness_date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="fitness_exp_date" className="form-label">Fitness Expiry Date</label>
              <input
                type="date"
                id="fitness_exp_date"
                name="fitness_exp_date"
                className="form-control"
                value={formData.fitness_exp_date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="pollution_date" className="form-label">Pollution Date</label>
              <input
                type="date"
                id="pollution_date"
                name="pollution_date"
                className="form-control"
                value={formData.pollution_date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="pollution_exp_date" className="form-label">Pollution Expiry Date</label>
              <input
                type="date"
                id="pollution_exp_date"
                name="pollution_exp_date"
                className="form-control"
                value={formData.pollution_exp_date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="insurance_image" className="form-label">Insurance Upload</label>
              <input
                type="file"
                id="insurance_image"
                name="insurance_image"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="fitness_image" className="form-label">Fitness Upload</label>
              <input
                type="file"
                id="fitness_image"
                name="fitness_image"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="pollution_image" className="form-label">Pollution Upload</label>
              <input
                type="file"
                id="pollution_image"
                name="pollution_image"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="ownership_image" className="form-label">RC Upload</label>
              <input
                type="file"
                id="ownership_image"
                name="ownership_image"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="photos" className="form-label">E-Rickshaw Photo</label>
              <input
                type="file"
                id="photos"
                name="photos"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
            </div>
          </div>
        </div>
        <button type=" submit" className="btn btn-primary float-end">Submit</button>
      </form>
    </div>
  );
};

export default VehicleRegistration4;