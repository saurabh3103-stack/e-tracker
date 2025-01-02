import React, { useState } from 'react';
import axios from 'axios';
import SuccessPopup from '../../../Component/SuccessPopup';

const AddZone = () => {
  const [formData, setFormData] = useState({
    zone_id: '',
    zone_name: '',
    zone_region: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.zone_id || !formData.zone_name || !formData.zone_region) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3002/api/zones/add_zone',
        formData,
        {
          headers: {
            'x-api-key': 'your_secret_key', // Replace with your actual key
          },
        },
      );

      if (response.status === 200) {
        setError(''); // Clear any error messages
        setIsSubmitted(true);
        setIsVisible(true); // Show the success popup
        setFormData({ zone_id: '', zone_name: '', zone_region: '' }); // Reset form data
      } else {
        setError('Failed to add zone. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
      setError(
        'Failed to add zone. Please check your connection or API endpoint.',
      );
    }
  };

  // Handle success popup close
  const handleClosePopup = () => {
    setIsVisible(false);
    setIsSubmitted(false);
  };

  return (
    <>
      <div className="row gx-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-light m-0">Add Zone</h5>
            </div>

            {/* Success Popup */}
            {isVisible && (
              <SuccessPopup isVisible={isVisible} onClose={handleClosePopup} />
            )}

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row gx-3">
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zone_id">
                        Zone ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zone_id"
                        value={formData.zone_id}
                        onChange={handleInputChange}
                        placeholder="Enter Zone ID"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zone_region">
                        Zone Region
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zone_region"
                        value={formData.zone_region}
                        onChange={handleInputChange}
                        placeholder="Enter Zone Region"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="zone_name">
                        Zone Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zone_name"
                        value={formData.zone_name}
                        onChange={handleInputChange}
                        placeholder="Enter Zone Name"
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
                        zone_id: '',
                        zone_name: '',
                        zone_region: '',
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

export default AddZone;
