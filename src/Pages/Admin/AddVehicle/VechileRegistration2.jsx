import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify'; 
import VehicleRegistration4 from './VechileRegistraion4';
import { AppContext } from '../../../context/AppContext';// Assuming you're using react-toastify for notifications

const VehicleRegistration2 = ({ ownerId,refId, increment }) => {
  // Initializing state to store form data

  const { setVehicleId,setRegistration_number } = useContext(AppContext);

  const [formData, setFormData] = useState({
    owner_id: ownerId,
    vehicle_type: '',
    vehicle_purchase_date: '',
    make: '',
    model: '',
    year_of_manufacture: '',
    color: '',
    registration_number: '',
    vehicle_route: '',
    qr_assing_status: 0,
    qrID: '',
    reference_id: refId,
    added_by: 'admin',  
    added_id: localStorage.getItem("user_id"), 
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = 'http://localhost:3002/api/vehicle/create';
      const headers = {
        'x-api-key': 'your_secret_key',
        'Content-Type': 'application/json',
      };
      const response = await axios.post(apiUrl, formData, { headers });
      if (response.status === 201) {
        const vehicleId = response.data.vehicle._id; 
        console.log("Vehicle ID:", vehicleId);
        toast.success("Vehicle registered successfully!");
        increment();
        setVehicleId(vehicleId)
        setRegistration_number(formData.registration_number)
      } else {
        toast.error("Failed to register the vehicle.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while registering the vehicle.");
    }
  };
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="vehicle_type" className="form-label">Reference Number</label>
            <input
              type="text"
              className="form-control"
              value={refId} disabled
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="vehicle_type" className="form-label">Vehicle Type</label>
            <input
              type="text"
              id="vehicle_type"
              name="vehicle_type"
              className="form-control"
              value={formData.vehicle_type}
              onChange={handleInputChange}
              placeholder="Enter Vehicle Type"
              required
            />
          </div>
           <div className="col-md-6 mb-3">
            <label htmlFor="registration_number" className="form-label">Registration Number</label>
            <input
              type="text"
              id="registration_number"
              name="registration_number"
              className="form-control"
              value={formData.registration_number}
              onChange={handleInputChange}
              placeholder="Enter Registration Number"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="vehicle_purchase_date" className="form-label">Purchase Date</label>
            <input
              type="date"
              id="vehicle_purchase_date"
              name="vehicle_purchase_date"
              className="form-control"
              value={formData.vehicle_purchase_date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="make" className="form-label">Manufacturer</label>
            <input
              type="text"
              id="make"
              name="make"
              className="form-control"
              value={formData.make}
              onChange={handleInputChange}
              placeholder="Enter Manufacturer"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="model" className="form-label">Model Number</label>
            <input
              type="text"
              id="model"
              name="model"
              className="form-control"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Enter Model Number"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="year_of_manufacture" className="form-label">Year of Manufacturing</label>
            <input
              type="number"
              id="year_of_manufacture"
              name="year_of_manufacture"
              className="form-control"
              value={formData.year_of_manufacture}
              onChange={handleInputChange}
              placeholder="Enter Year of Manufacturing"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="color" className="form-label">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              className="form-control"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="Enter Color"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Register Vehicle</button>
        </div>
      </form>
    </div>
    
  );
};

export default VehicleRegistration2;