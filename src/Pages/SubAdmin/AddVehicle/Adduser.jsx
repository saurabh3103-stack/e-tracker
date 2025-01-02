import React, { createContext, useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Brandcrump from '../../../Component/Brandcrump';

function Adduser() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

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
    d_addhar_image: '',
    d_photo: null,
    d_dl_number: '',
    driver_dl_image: null,
    d_address_line_f: '',
    d_address_line_t: '',
    d_city: '',
    d_state: '',
    d_pin_code: '',
    e_ricksaw_route: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [previewAadhar, setPreviewAadhar] = useState(null);

  // Validation check
  const validateForm = () => {
    return true;
    const errors = {};
    Object.keys(formData).forEach((field) => {
      if (
        !formData[field] &&
        field !== 'd_photo' &&
        field !== 'owner_dl' &&
        field !== 'owner_dl_image' &&
        field !== 'd_addhar_image' &&
        field !== 'driver_dl_image' &&
        field !== 'address_line_t' &&
        field !== 'd_address_line_t'
      ) {
        errors[field] = 'This field is required';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (
      id === 'owner_photo' ||
      id === 'addhar_image' ||
      id === 'owner_dl_image' ||
      id === 'rickshaw_photo' ||
      id === 'd_addhar_image' ||
      id === 'd_photo' ||
      id === 'driver_dl_image'
    ) {
      setFormData({ ...formData, [id]: files[0] });
      const reader = new FileReader();
      reader.onload = (event) => {
        if (id === 'owner_photo') setPreviewPhoto(event.target.result);
        if (id === 'addhar_image') setPreviewAadhar(event.target.result);
        if (id === 'owner_dl_image') setPreviewPhoto(event.target.result);
        if (id === 'rickshaw_photo') setPreviewAadhar(event.target.result);
        if (id === 'd_addhar_image') setPreviewPhoto(event.target.result);
        if (id === 'd_photo') setPreviewAadhar(event.target.result);
        if (id === 'driver_dl_image') setPreviewAadhar(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // Handle file change (for image preview)
  const handleFileChange = (e) => {
    const { id, files } = e.target;
    const file = files[0];
    setFormData((prev) => ({
      ...prev,
      [id]: file,
    }));

    // Preview image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages((prev) => ({
          ...prev,
          [id]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create form data to send both files and text data
    const submissionData = new FormData();
    submissionData.append('owner_name', formData.owner_name);
    submissionData.append('email', formData.email);
    submissionData.append('phone_owner', formData.phone_owner);
    submissionData.append('owner_photo', formData.owner_photo);
    submissionData.append('addhar_number', formData.addhar_number);
    submissionData.append('addhar_image', formData.addhar_image);
    submissionData.append('owner_dl', formData.owner_dl);
    submissionData.append('owner_dl_image', formData.owner_dl_image);
    submissionData.append('e_rickshaw', formData.e_rickshaw);
    submissionData.append('chassis', formData.chassis);
    submissionData.append('fitness', formData.fitness);
    submissionData.append('rickshaw_photo', formData.rickshaw_photo);
    submissionData.append('address_line_f', formData.address_line_f);
    submissionData.append('address_line_t', formData.address_line_t);
    submissionData.append('city', formData.city);
    submissionData.append('state', formData.state);
    submissionData.append('pin_code', formData.pin_code);
    submissionData.append('driver_name', formData.driver_name);
    submissionData.append('d_phone', formData.d_phone);
    submissionData.append('d_addhar_number', formData.d_addhar_number);
    submissionData.append('d_addhar_image', formData.d_addhar_image);
    submissionData.append('d_photo', formData.d_photo);
    submissionData.append('d_dl_number', formData.d_dl_number);
    submissionData.append('driver_dl_image', formData.driver_dl_image);
    submissionData.append('d_address_line_f', formData.d_address_line_f);
    submissionData.append('d_address_line_t', formData.d_address_line_t);
    submissionData.append('d_city', formData.d_city);
    submissionData.append('d_state', formData.d_state);
    submissionData.append('d_pin_code', formData.d_pin_code);
    submissionData.append('e_ricksaw_route', formData.e_ricksaw_route);
    if (validateForm()) {
      // console.log(formData);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
          'x-api-key': 'your_secret_key', // Pass the token if required
        },
      };
      try {
        console.log(formData);
        const response = await axios.post(
          'http://localhost:3002/api/users/add_user',
          submissionData,
        );
        console.log('Success:', response.data);
        const userId = response.data.userId;
        navigate(`/preview/${userId}/0`);
      } catch (error) {
        console.error('Error:', error);
      }
      // navigate('/dashboard');
    } else {
      console.log(formErrors);
      console.log('Not Preview');
    }
  };
  return (
    <>
      <div class="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="E-Rickshaw Registration"
          url="/dashboard"
          breadcrumb="E-Rickshaw Registration"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light">
                  {currentStep === 1
                    ? 'E-Rickshaw Registration'
                    : 'Driver Details'}
                </h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  {currentStep === 1 ? (
                    <div className="row gx-3">
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a4">
                            E-Rickshaw Number{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.e_rickshaw ? 'is-invalid' : ''
                            }`}
                            value={formData.e_rickshaw}
                            onChange={handleInputChange}
                            id="e_rickshaw"
                            placeholder="Enter E-Rickshaw Number"
                          />
                          {formErrors.e_rickshaw && (
                            <small className="text-danger">
                              {formErrors.e_rickshaw}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a5">
                            Chassis Number{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.chassis ? 'is-invalid' : ''
                            }`}
                            value={formData.chassis}
                            onChange={handleInputChange}
                            id="chassis"
                            placeholder="Enter Chassis Number"
                          />
                          {formErrors.chassis && (
                            <small className="text-danger">
                              {formErrors.chassis}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a5">
                            Fitness Expire{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className={`form-control ${
                              formErrors.fitness ? 'is-invalid' : ''
                            }`}
                            value={formData.fitness}
                            onChange={handleInputChange}
                            id="fitness"
                            placeholder="Enter Chassis Number"
                          />
                          {formErrors.fitness && (
                            <small className="text-danger">
                              {formErrors.fitness}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a4">
                            E-Rickshaw Photo{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className={`form-control ${
                              formErrors.rickshaw_photo ? 'is-invalid' : ''
                            }`}
                            onChange={handleInputChange}
                            id="rickshaw_photo"
                          />
                          {formErrors.rickshaw_photo && (
                            <small className="text-danger">
                              {formErrors.rickshaw_photo}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a1">
                            Owner Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.owner_name ? 'is-invalid' : ''
                            }`}
                            id="owner_name"
                            placeholder="Enter Owner fullname"
                            value={formData.owner_name}
                            onChange={handleInputChange}
                          />
                          {formErrors.owner_name && (
                            <small className="text-danger">
                              {formErrors.owner_name}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a2">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Owner email address"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a3">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.phone_owner ? 'is-invalid' : ''
                            }`}
                            id="phone_owner"
                            placeholder="Enter Owner phone number"
                            value={formData.phone_owner}
                            onChange={handleInputChange}
                          />
                          {formErrors.phone_owner && (
                            <small className="text-danger">
                              {formErrors.phone_owner}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Owner Photo <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className={`form-control ${
                              formErrors.owner_photo ? 'is-invalid' : ''
                            }`}
                            onChange={handleInputChange}
                            id="owner_photo"
                          />
                          {formErrors.owner_photo && (
                            <small className="text-danger">
                              {formErrors.owner_photo}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a6">
                            Addhar Card Number{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.addhar_number ? 'is-invalid' : ''
                            }`}
                            value={formData.addhar_number}
                            onChange={handleInputChange}
                            id="addhar_number"
                            placeholder="Enter Addhar Card Number"
                          />
                          {formErrors.addhar_number && (
                            <small className="text-danger">
                              {formErrors.addhar_number}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a7">
                            Addhar Upload <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className={`form-control ${
                              formErrors.addhar_image ? 'is-invalid' : ''
                            }`}
                            onChange={handleInputChange}
                            id="addhar_image"
                          />
                          {formErrors.addhar_image && (
                            <small className="text-danger">
                              {formErrors.addhar_image}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
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
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Owner DL Upload
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="owner_dl_image"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Address Line 1{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.address_line_f ? 'is-invalid' : ''
                            }`}
                            value={formData.address_line_f}
                            onChange={handleInputChange}
                            id="address_line_f"
                            placeholder="Enter Address Line 1"
                          />
                          {formErrors.address_line_f && (
                            <small className="text-danger">
                              {formErrors.address_line_f}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Address Line 2{' '}
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
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            City <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.city ? 'is-invalid' : ''
                            }`}
                            value={formData.city}
                            onChange={handleInputChange}
                            id="city"
                            placeholder="Enter City Name"
                          />
                          {formErrors.city && (
                            <small className="text-danger">
                              {formErrors.city}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            State <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.state ? 'is-invalid' : ''
                            }`}
                            value={formData.state}
                            onChange={handleInputChange}
                            id="state"
                            placeholder="Enter State Name"
                          />
                          {formErrors.state && (
                            <small className="text-danger">
                              {formErrors.state}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Pin Code <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.pin_code ? 'is-invalid' : ''
                            }`}
                            value={formData.pin_code}
                            onChange={handleInputChange}
                            id="pin_code"
                            placeholder="Enter Pin Code"
                          />
                          {formErrors.pin_code && (
                            <small className="text-danger">
                              {formErrors.pin_code}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row gx-3">
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a1">
                            Driver Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.driver_name ? 'is-invalid' : ''
                            }`}
                            value={formData.driver_name}
                            onChange={handleInputChange}
                            id="driver_name"
                            placeholder="Enter Fullname"
                          />
                          {formErrors.driver_name && (
                            <small className="text-danger">
                              {formErrors.driver_name}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a3">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className={`form-control ${
                              formErrors.d_phone ? 'is-invalid' : ''
                            }`}
                            value={formData.d_phone}
                            onChange={handleInputChange}
                            id="d_phone"
                            placeholder="Enter Phone Number"
                          />
                          {formErrors.d_phone && (
                            <small className="text-danger">
                              {formErrors.d_phone}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a6">
                            Addhar Card Number{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.d_addhar_number ? 'is-invalid' : ''
                            }`}
                            value={formData.d_addhar_number}
                            onChange={handleInputChange}
                            id="d_addhar_number"
                            placeholder="Enter Addhar Card Number"
                          />
                          {formErrors.d_addhar_number && (
                            <small className="text-danger">
                              {formErrors.d_addhar_number}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a7">
                            Addhar Upload <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className={`form-control ${
                              formErrors.d_addhar_image ? 'is-invalid' : ''
                            }`}
                            onChange={handleInputChange}
                            id="d_addhar_image"
                          />
                          {formErrors.d_addhar_image && (
                            <small className="text-danger">
                              {formErrors.d_addhar_image}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Driver Photo <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className={`form-control ${
                              formErrors.d_photo ? 'is-invalid' : ''
                            }`}
                            onChange={handleInputChange}
                            id="d_photo"
                          />
                          {formErrors.d_photo && (
                            <small className="text-danger">
                              {formErrors.d_photo}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Driver DL <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.d_dl_number ? 'is-invalid' : ''
                            }`}
                            value={formData.d_dl_number}
                            onChange={handleInputChange}
                            id="d_dl_number"
                            placeholder="Enter Driver DL Number"
                          />
                          {formErrors.d_dl_number && (
                            <small className="text-danger">
                              {formErrors.d_dl_number}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Driver DL Upload{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className={`form-control ${
                              formErrors.driver_dl_image ? 'is-invalid' : ''
                            }`}
                            onChange={handleInputChange}
                            id="driver_dl_image"
                          />
                          {formErrors.driver_dl_image && (
                            <small className="text-danger">
                              {formErrors.driver_dl_image}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Address Line 1{' '}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.d_address_line_f ? 'is-invalid' : ''
                            }`}
                            value={formData.d_address_line_f}
                            onChange={handleInputChange}
                            id="d_address_line_f"
                            placeholder="Enter Address Line 1"
                          />
                          {formErrors.d_address_line_f && (
                            <small className="text-danger">
                              {formErrors.d_address_line_f}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
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
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            City <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.d_city ? 'is-invalid' : ''
                            }`}
                            value={formData.d_city}
                            onChange={handleInputChange}
                            id="d_city"
                            placeholder="Enter City Name"
                          />
                          {formErrors.d_city && (
                            <small className="text-danger">
                              {formErrors.d_city}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            State <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.d_state ? 'is-invalid' : ''
                            }`}
                            value={formData.d_state}
                            onChange={handleInputChange}
                            id="d_state"
                            placeholder="Enter State Name"
                          />
                          {formErrors.d_state && (
                            <small className="text-danger">
                              {formErrors.d_state}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6  col-sm-12 col-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="a8">
                            Pin Code <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.d_pin_code ? 'is-invalid' : ''
                            }`}
                            value={formData.d_pin_code}
                            onChange={handleInputChange}
                            id="d_pin_code"
                            placeholder="Enter Pin Code"
                          />
                          {formErrors.d_pin_code && (
                            <small className="text-danger">
                              {formErrors.d_pin_code}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <div className="d-flex gap-2 justify-content-end">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={prevStep}
                      >
                        Previous
                      </button>
                    )}
                    {currentStep < 2 ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleSubmit}
                      >
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
    </>
  );
}
export default Adduser;
