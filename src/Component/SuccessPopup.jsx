import React from 'react';

const SuccessPopup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <span style={popupStyles.checkmark}><img src={'/Update/images/gif/success-img3.gif'} className='w-25'/></span>
        <h6>Form Submitted Successfully!</h6>
        <button onClick={onClose} style={popupStyles.button}>OK</button>
      </div>
    </div>
  );
};

// Popup styles
const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '25%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  checkmark: {
    fontSize: '50px',
    color: 'green',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SuccessPopup;
