import React, { useState } from 'react';

function FormWizard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setSubmitted(true);
    // Simulate form submission (You can replace this with actual form submission logic)
    setTimeout(() => {
      alert('Form Submitted Successfully!');
      // Reset form data
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Form with Preview</h2>

      {!submitted ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button onClick={handlePreview}>Preview</button>
        </form>
      ) : (
        <p>Your form has been submitted successfully!</p>
      )}

      {/* Modal for Preview */}
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Form Preview</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Message:</strong> {formData.message}</p>
            <button onClick={handleConfirm}>Confirm and Submit</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Basic modal styling
const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
};

export default FormWizard;
