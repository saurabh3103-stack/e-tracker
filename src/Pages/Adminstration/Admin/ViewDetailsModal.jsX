import React from 'react';

const ViewDetailsModal = ({ selectedAdmin, isEditMode, setShowDetailsModal, updateDetails, setSelectedAdmin }) => {
  const handleChange = (e) => {
    setSelectedAdmin({ ...selectedAdmin, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditMode ? 'Edit Admin Details' : 'View Admin Details'}</h5>
            <button type="button" className="close" onClick={() => setShowDetailsModal(false)}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Admin Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="admin_name"
                  value={selectedAdmin.admin_name || ''}
                  onChange={handleChange}
                  disabled={!isEditMode} // Disable in view mode
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={selectedAdmin.email || ''}
                  onChange={handleChange}
                  disabled={!isEditMode} // Disable in view mode
                />
              </div>
              {isEditMode && (
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={() => updateDetails(selectedAdmin._id)}
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
