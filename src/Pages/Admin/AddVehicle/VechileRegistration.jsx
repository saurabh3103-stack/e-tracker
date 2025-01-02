
import React, { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import Brandcrump from "../../../Component/Brandcrump";
import VechileRegistration2 from "./VechileRegistration2";
import VechileRegistration3 from "./VechileRegistration3";
import VechileRegistraion4 from "./VechileRegistraion4";
import axios from 'axios';

const VehicleRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOwnerDriver, setIsOwnerDriver] = useState(false); 
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    profile_pic: null,
    aadhar_number: "",
    aadhar_image: null,
    driving_license_number: "",
    driving_license: null,
    address: "",
    city: "",
    state: "",
    pin: "",
    isDriver:"no",
    added_by: 'admin',
    added_id: localStorage.getItem('user_id'),
  });
  const handleOwnerDriverChange = (e) => {
    const isChecked = e.target.checked ? "yes" : "no"; // set value to "yes" or "no"
    setFormData((prevState) => ({
      ...prevState,
      isDriver: isChecked
    }));
    console.log("isOwnerDriver:", isChecked); 
  };


  const [ownerId, setOwnerId] = useState(null);
  const [referenceId,setreferenceId]=useState(null);
  const handleSubmit = async () => {
    try {
      const apiUrl = 'http://localhost:3002/api/owner/create';
      const headers = {
        'x-api-key': 'your_secret_key', // Replace with your actual API key
      };
  
      // Create a FormData instance
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
  
      // Send the POST request with FormData
      const response = await axios.post(apiUrl, data, { headers });
  
      // Handle the response
      toast.success("Form submitted successfully!");
      const ownerId = response.data.owner._id;
      setOwnerId(ownerId);
      setreferenceId(response.data.owner.reference_id);
      increment();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  function increment(){
    setCurrentStep((prevStep) => prevStep + 1);
  }
  

  const handleInputChange = (e) => {
  const { id, value, type, files } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [id]: type === 'file' ? files[0] : value,
  }));
};

  

  return (
    <>
      <Toaster />
      <div className="dashboard-main-body">
        <Brandcrump pageName="Dashboard" title="E-Rickshaw Registration" url="/dashboard" breadcrumb="E-Rickshaw Registration" />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light">
                  {currentStep === 1 ? "Owner Details" : currentStep === 2 ? "Vehicle Information" : currentStep === 3 ? "Uploaded Documents" : "Driver Details"}
                </h5>
              </div>
              <div className="card-body">
                {currentStep === 1 && (
                  <div className="row gx-3">
                    {/* Owner Details Form Fields */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                          Owner Name <span className=" text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                          id="name"
                          placeholder="Enter Owner full name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                          id="email"
                          placeholder="Enter Owner email address"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="phone">
                          Phone <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                          id="phone"
                          placeholder="Enter Owner phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                        {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">           
                      <div className="mb-3">
                        <label className="form-label" htmlFor="dob">
                          Date of Birth <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className={`form-control ${formErrors.dob ? 'is-invalid' : ''}`}
                          id="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                        />
                        {formErrors.dob && <small className="text-danger">{formErrors.dob}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
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
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="profile_pic">
                          Owner Photo <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className={`form-control ${formErrors.profile_pic ? 'is-invalid' : ''}`}
                          id="profile_pic"
                          onChange={ handleInputChange}
                        />
                        {formErrors.profile_pic && <small className="text-danger">{formErrors.profile_pic}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="aadhar_number">
                          Aadhar Card Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.aadhar_number ? 'is-invalid' : ''}`}
                          id="aadhar_number"
                          placeholder="Enter Aadhar Card Number"
                          value={formData.aadhar_number}
                          onChange={handleInputChange}
                        />
                        {formErrors.aadhar_number && <small className="text-danger">{formErrors.aadhar_number}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="aadhar_image">
                          Aadhar Card Upload <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className={`form-control ${formErrors.aadhar_image ? 'is-invalid' : ''}`}
                          id="aadhar_image"
                          onChange={handleInputChange}
                        />
                        {formErrors.aadhar_image && <small className="text-danger">{formErrors.aadhar_image}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="driving_license_number">
                          Driving License
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="driving_license_number"
                          placeholder="Enter Owner DL"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="driving_license">
                          Driving License Upload
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="driving_license"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="address">
                          Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                          id="address"
                          placeholder="Enter Address Line 1"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {formErrors.address && <small className="text-danger">{formErrors.address}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="city">
                          City <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                          id="city"
                          placeholder="Enter City Name"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        {formErrors.city && <small className="text-danger">{formErrors.city}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="state">
                          State <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                          id="state"
                          placeholder="Enter State Name"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                        {formErrors.state && <small className="text-danger">{formErrors.state}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pin">
                          Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.pin ? 'is-invalid' : ''}`}
                          id="pin"
                          placeholder="Enter Pin Code"
                          value={formData.pin}
                          onChange={handleInputChange}
                        />
                        {formErrors.pin && <small className="text-danger">{formErrors.pin}</small>}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-6">
                      <div className="mb-3">
                        <input
                          type="checkbox"
                          id="ownerDriver"
                          checked={formData.isDriver === "yes"}
                          onChange={handleOwnerDriverChange} className="form-check-input "/>
                        <label htmlFor="ownerDriver" className="ml-2" style={{fontSize:"1.2rem"}}>         Owner is also the Driver</label>
                      </div>
                      <button type="submit" className="btn btn-success float-end" onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <VechileRegistration2 ownerId={ownerId} refId={referenceId} increment={increment}/>
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <VechileRegistration3 ownerId={ownerId} refId={referenceId} increment={increment}/>
                  </div>
                )}
                {currentStep === 4 && (
                  <div>
                    <VechileRegistraion4 ownerId={ownerId} refId={referenceId}/>
                  </div>
                )}
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleRegistration;