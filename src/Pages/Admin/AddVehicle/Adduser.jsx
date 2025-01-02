import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Brandcrump from '../../../Component/Brandcrump';

function Adduser() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    owner_name: '',
    email: '',
    phone_owner: '',
    owner_photo: null,
    addhar_number: '',
    addhar_image: null,
 owner_dl: '',
     owner_dl_image: null,
    e_rickshaw: '',
    chassis: '',
    fitness: '',
    rickshaw_photo: null,
    address_line_f: '',
    address_line_t: '',
    city: '',
    state: '',
    pin_code: '',
    driver_name: '',
    d_phone: '',
    d_addhar_number: '',
    d_addhar_image: null,
    d_photo: null,
    d_dl_number: '',
    driver_dl_image: null,
    d_address_line_f: '',
    d_address_line_t: '',
    d_city: '',
    d_state: '',
    d_pin_code: '',
    // e_ricksaw_route: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field] && ![, 'address_line_t', 'd_address_line_t'].includes(field)) {
        errors[field] = 'This field is required';
      }
    });
    setFormErrors(errors);
    console.log(errors)
    return Object.keys(errors).length === 0;
   
  };

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [id]: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prev) => ({ ...prev, [id]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    console.log("handle submit clicked")
    e.preventDefault();
    console.log(formData)
   
    if (validateForm()) {
      const adminId = localStorage.getItem('user_id');
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
        console.log(submissionData,"in submit")
      });
      submissionData.append('admin_id', adminId);
      submissionData.append('admin_type', 'admin');


     
      try {
        const response = await axios.post('http://localhost:3002/api/users/add_user', submissionData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': 'your_secret_key',
          },
        });
        const userId = response.data.userId;
        navigate(`/admin/preview/${userId}/0`);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="dashboard-main-body">
      <Brandcrump pageName="Dashboard" title="E-Rickshaw Registration" url="/dashboard" breadcrumb="E-Rickshaw Registration" />
      <div className="row gx-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-light">{currentStep === 1 ? 'E-Rickshaw Registration' : 'Driver Details'}</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">

                {currentStep === 1 ? (
                  <div className="row gx-3">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="e_rickshaw">
                          E-Rickshaw Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.e_rickshaw ? 'is-invalid' : ''}`}
                          id="e_rickshaw"
                          placeholder="Enter E-Rickshaw Number"
                          value={formData.e_rickshaw}
                          onChange={handleInputChange}
                        />
                        {formErrors.e_rickshaw && <small className="text-danger">{formErrors.e_rickshaw}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="chassis">
                          Chassis Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.chassis ? 'is-invalid' : ''}`}
                          id="chassis"
                          placeholder="Enter Chassis Number"
                          value={formData.chassis}
                          onChange={handleInputChange}
                        />
                        {formErrors.chassis && <small className="text-danger">{formErrors.chassis}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="fitness">
                          Fitness Expire <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className={`form-control ${formErrors.fitness ? 'is-invalid' : ''}`}
                          id="fitness"
                          value={formData.fitness}
                          onChange={handleInputChange}
                        />
                        {formErrors.fitness && <small className="text-danger">{formErrors.fitness}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="rickshaw_photo">
                          E-Rickshaw Photo <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className={`form-control ${formErrors.rickshaw_photo ? 'is-invalid' : ''}`}
                          id="rickshaw_photo"
                          onChange={handleInputChange}
                        />
                        {formErrors.rickshaw_photo && <small className="text-danger">{formErrors.rickshaw_photo}</small>}
                        {imagePreviews.rickshaw_photo && <img src={imagePreviews.rickshaw_photo} alt="Preview" 
    className="w-50 mx-auto d-block" />}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="owner_name">
                          Owner Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.owner_name ? 'is-invalid' : ''}`}
                          id="owner_name"
                          placeholder="Enter Owner fullname"
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
                        {imagePreviews.owner_photo && <img src={imagePreviews.owner_photo} alt="Preview" 
    className="w-50 mx-auto d-block" />}
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
                        <label className="form-label" htmlFor="owner_dl">
                          Owner DL
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
                          Owner DL Upload
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="owner_dl_image"
                          onChange={handleInputChange}
                        />
                        {imagePreviews.owner_dl_image && <img src={imagePreviews.owner_dl_image} alt="Preview" 
    className="w-50 mx-auto d-block" />}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="address_line_f">
                          Address Line 1 <span className="text-danger">*</span>
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
                        <label className="form-label" htmlFor="address_line_t">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address_line_t"
                          placeholder="Enter Address Line 2"
                          onChange={handleInputChange}
                        />
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
                  </div>
                ) : (
                  <div className="row gx-3">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="driver_name">
                          Driver Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.driver_name ? 'is-invalid' : ''}`}
                          id="driver_name"
                          placeholder="Enter Fullname"
                          value={formData.driver_name}
                          onChange={handleInputChange}
                        />
                        {formErrors.driver_name && <small className="text-danger">{formErrors.driver_name}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_phone">
                          Phone <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className={`form-control ${formErrors.d_phone ? 'is-invalid' : ''}`}
                          id="d_phone"
                          placeholder="Enter Phone Number"
                          value={formData.d_phone}
                          onChange={handleInputChange}
                        />
                        {formErrors.d_phone && <small className="text-danger">{formErrors.d_phone}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_addhar_number">
                          Aadhar Card Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors .d_addhar_number ? 'is-invalid' : ''}`}
                          id="d_addhar_number"
                          placeholder="Enter Aadhar Card Number"
                          value={formData.d_addhar_number}
                          onChange={handleInputChange}
                        />
                        {formErrors.d_addhar_number && <small className="text-danger">{formErrors.d_addhar_number}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="addhar_image">
                          Aadhar Upload <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className={`form-control ${formErrors.addhar_image ? 'is-invalid' : ''}`}
                          id="addhar_image"
                          onChange={handleInputChange}
                        />
                        {formErrors.addhar_image && <small className="text-danger">{formErrors.addhar_image}</small>}
                        {imagePreviews.addhar_image && (
  <img 
    src={imagePreviews.addhar_image} 
    alt="Preview" 
    className="w-50 mx-auto d-block" 
  />
)}
                      </div>



                      <div className="mb-3">
                        <label className="form-label" htmlFor="addhar_image">
                          Aadhar Upload <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className={`form-control ${formErrors.d_addhar_image ? 'is-invalid' : ''}`}
                          id="addhar_image"
                          onChange={handleInputChange}
                        />
                        {formErrors.d_addhar_image && <small className="text-danger">{formErrors.d_addhar_image}</small>}
                        {imagePreviews.d_addhar_image && (
  <img 
    src={imagePreviews.d_addhar_image} 
    alt="Preview" 
    className="w-50 mx-auto d-block" 
  />
)}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_photo">
                          Driver Photo <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className={`form-control ${formErrors.d_photo ? 'is-invalid' : ''}`}
                          id="d_photo"
                          onChange={handleInputChange}
                        />
                        {formErrors.d_photo && <small className="text-danger">{formErrors.d_photo}</small>}
                        {imagePreviews.d_photo && <img src={imagePreviews.d_photo} alt="Preview" 
    className="w-50 mx-auto d-block" />}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_dl_number">
                          Driver DL <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.d_dl_number ? 'is-invalid' : ''}`}
                          id="d_dl_number"
                          placeholder="Enter Driver DL Number"
                          value={formData.d_dl_number}
                          onChange={handleInputChange}
                        />
                        {formErrors.d_dl_number && <small className="text-danger">{formErrors.d_dl_number}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="driver_dl_image">
                          Driver DL Upload <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className={`form-control ${formErrors.driver_dl_image ? 'is-invalid' : ''}`}
                          id="driver_dl_image"
                          onChange={handleInputChange}
                        />
                        {formErrors.driver_dl_image && <small className="text-danger">{formErrors.driver_dl_image}</small>}
                        {imagePreviews.driver_dl_image && <img src={imagePreviews.driver_dl_image} alt="Preview" 
    className="w-50 mx-auto d-block" />}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_address_line_f">
                          Address Line 1 <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.d_address_line_f ? 'is-invalid' : ''}`}
                          id="d_address_line_f"
                          placeholder="Enter Address Line 1"
                          value={formData.d_address_line_f}
                          onChange={handleInputChange}
                        />
                        {formErrors.d_address_line_f && <small className="text-danger">{formErrors.d_address_line_f}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_address_line_t">
                          Address Line 2
                        </label>
                        <input
                       
                          type="text"
                          className="form-control"
                          id="d_address_line_t"
                          placeholder="Enter Address Line 2"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_city">
                          City <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.d_city ? 'is-invalid' : ''}`}
                          id="d_city"
                          placeholder="Enter City Name"
                          value={formData.d_city}
                          onChange={handleInputChange}
                        />
                        {formErrors.d_city && <small className="text-danger">{formErrors.d_city}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_state">
                          State <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.d_state ? 'is-invalid' : ''}`}
                          id="d_state"
                          placeholder="Enter State Name"
                          value={formData.d_state}
                          onChange={handleInputChange}
                        />
                        {formErrors.d_state && <small className="text-danger">{formErrors.d_state}</small>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="d_pin_code">
                          Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.d_pin_code ? 'is-invalid' : ''}`}
                          id="d_pin_code"
                          placeholder="Enter Pin Code"
                          value={formData.d_pin_code}
                          onChange={handleInputChange}
                        />
                        {formErrors.d_pin_code && <small className="text-danger">{formErrors.d_pin_code}</small>}
                      </div>
                    </div>
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
                  {currentStep < 2 ? (
                    <button type="button" className="btn btn-success" onClick={nextStep}>
                      Next
                    </button>
                  ) : (
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>
                      Preview
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adduser;