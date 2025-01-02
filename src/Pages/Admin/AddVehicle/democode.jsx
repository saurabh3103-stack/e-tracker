


import React, { useState } from "react";
import Brandcrump from "../../../Component/Brandcrump";
import './VehicleRegistration.css';
const VehicleRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOwnerDriver, setIsOwnerDriver] = useState(false); 
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    owner_name: "",
    email: "",
    phone_owner: "",
    dob: "",
    owner_photo: null,
    addhar_number: "",
    owner_dl: "",
    owner_dl_image: null,
    address_line_f: "",
    city: "",
    state: "",
    pin_code: "",
  });
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'file' ? files[0] : value,
    }));
  };
  const handleOwnerDriverChange = (e) => {
    setIsOwnerDriver(e.target.checked);
    console.log("isOwnerDriver:", e.target.checked); 
  };

  return (
    <>
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
                <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="owner_name">
                      Owner Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.owner_name ? 'is-invalid' : ''}`}
                      id="owner_name"
                      placeholder="Enter Owner full name"
                      value={formData.owner_name}
                      onChange={handleInputChange}
                    />
                    {formErrors.owner_name && <small className="text-danger">{formErrors.owner_name}</small>}
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
                    <label className="form-label" htmlFor="phone_owner">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.phone_owner ? 'is-invalid' : ''}`}
                      id="phone_owner"
                      placeholder="Enter Owner phone number"
                      value={formData.phone_owner}
                      onChange={handleInputChange}
                    />
                    {formErrors.phone_owner && <small className="text-danger">{formErrors.phone_owner}</small>}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-6">           
                  <div className="mb-3">
                    <label className="form-label" htmlFor="phone_owner">
                      Date of Birth <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className={`form-control ${formErrors.dob ? 'is-invalid' : ''}`}
                      id="dob"
                      placeholder="Enter Owner phone number"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                    {formErrors.dob && <small className="text-danger">{formErrors.dob}</small>}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="gender">
                        Gender <span className="text-danger">*</span>
                        </label>
                        <div className="row">
                        <div className="form-check col-2">
                            <input type="radio" className="form-check-input"
                                id="male" name="gender" value="Male"
                                checked={formData.gender === 'Male'} onChange={handleInputChange}/>
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check col-2">
                            <input type="radio" className="form-check-input"
                                id="female" name="gender" value="Female" checked={formData.gender === 'Female'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                        <div className="form-check col-2">
                            <input type="radio" className="form-check-input"
                                id="other"  name="gender" value="Other"
                                checked={formData.gender === 'Other'}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="other">
                                Other
                            </label>
                        </div>
                        </div>
                        {formErrors.gender && <small className="text-danger">{formErrors.gender}</small>}
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="owner_photo">
                        Owner Photo <span className="text-danger">*</span>
                        </label>
                        <input
                        type="file"
                        className={`form-control ${formErrors.owner_photo ? 'is-invalid' : ''}`}
                        id="owner_photo"
                        onChange={handleInputChange}
                        />
                        {formErrors.owner_photo && <small className="text-danger">{formErrors.owner_photo}</small>}
                    
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="addhar_number">
                        Aadhar Card Number <span className="text-danger">*</span>
                        </label>
                        <input
                        type="text"
                        className={`form-control ${formErrors.addhar_number ? 'is-invalid' : ''}`}
                        id="addhar_number"
                        placeholder="Enter Aadhar Card Number"
                        value={formData.addhar_number}
                        onChange={handleInputChange}
                        />
                        {formErrors.addhar_number && <small className="text-danger">{formErrors.addhar_number}</small>}
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="addhar_number">
                        Aadhar Card Uplode <span className="text-danger">*</span>
                        </label>
                        <input
                        type="file"
                        className={`form-control ${formErrors.addhar_number ? 'is-invalid' : ''}`}
                        id="addhar_number"
                        placeholder="Enter Aadhar Card Number"
                        value={formData.addhar_number}
                        onChange={handleInputChange}
                        />
                        {formErrors.addhar_number && <small className="text-danger">{formErrors.addhar_number}</small>}
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="owner_dl">
                            Driving License
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="owner_dl"
                        placeholder="Enter Owner DL"
                        onChange={handleInputChange}
                        />
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="owner_dl_image">
                        Driving License Upload
                        </label>
                        <input
                        type="file"
                        className="form-control"
                        id="owner_dl_image"
                        onChange={handleInputChange}
                        />
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="address_line_f">
                        Address  <span className="text-danger">*</span>
                        </label>
                        <input
                        type="text"
                        className={`form-control ${formErrors.address_line_f ? 'is-invalid' : ''}`}
                        id="address_line_f"
                        placeholder="Enter Address Line 1"
                        value={formData.address_line_f}
                        onChange={handleInputChange}
                    
                        />
                        {formErrors.address_line_f && <small className="text-danger">{formErrors.address_line_f}</small>}
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
                        <label className="form-label" htmlFor="pin_code">
                        Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                        type="text"
                        className={`form-control ${formErrors.pin_code ? 'is-invalid' : ''}`}
                        id="pin_code"
                        placeholder="Enter Pin Code"
                        value={formData.pin_code}
                        onChange={handleInputChange}
                        />
                        {formErrors.pin_code && <small className="text-danger">{formErrors.pin_code}</small>}
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                        <div className="mb-3">
                            <input type="checkbox" id="ownerDriver" checked={isOwnerDriver} onChange={handleOwnerDriverChange}/>
                            <label>Owner is also the Driver</label>
                        </div>
                    </div>
              </div>
              )}

              {currentStep === 2 && (
                <div>
                  {/* Vehicle Information form fields go here */}
                  <input type="text" placeholder="Vehicle Model" />
                  <input type="text" placeholder="Vehicle Registration No." />
                  {/* Add more fields for Vehicle Information */}
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  {/* Document upload fields go here */}
                  <input type="file" />
                  <input type="file" />
                  {/* Add more fields for document uploads */}
                </div>
              )}

              {currentStep === 4 && !isOwnerDriver && (
                <div>
                  {/* Driver Details form fields go here */}
                  <input type="text" placeholder="Driver Name" />
                  <input type="text" placeholder="Driver License No." />
                  {/* Add more fields for Driver Details */}
                </div>
              )}
            </div>
              <div className="card-footer">
                <div className="d-flex gap-2 justify-content-end">
                  {currentStep > 1 && (
                    <button type="button" className="btn btn-danger" onClick={prevStep}>
                      Previous
                    </button>
                  )}
                  {currentStep < 4 ? (
                    <button type="button" className="btn btn-success" onClick={nextStep}>
                      Next
                    </button>
                  ) : (
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleRegistration;


