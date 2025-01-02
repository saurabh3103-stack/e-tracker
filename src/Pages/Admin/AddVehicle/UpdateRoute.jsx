import React from "react";

const UpdateRoute = () => {
    const ModalComponent = ({ route, handleInputChange, handleSubmit, handleModalClose }) => {
        const [showQrInput, setShowQrInput] = useState(false); // State to toggle QR input visibility
      
        // Function to handle QR selection change
        const handleQrChange = (e) => {
          handleInputChange(e); // Call the parent input change handler
          setShowQrInput(e.target.value === "1"); // Show input box if "1" is selected
        };
        return (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              aria-labelledby="routeModalLabel"
              aria-hidden="true"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  {/* Modal header */}
                  <div className="modal-header bg-info">
                    <h6 className="modal-title" id="routeModalLabel">Update Route</h6>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleModalClose}
                      aria-label="Close"
                    ></button>
                  </div>
        
                  {/* Modal form */}
                  <form>
                    <div className="modal-body">
                      {/* Select Route */}
                      <div className="mb-3">
                        <label htmlFor="routeSelect" className="form-label">
                          Select Route
                        </label>
                        <select
                          className="form-select"
                          name="e_ricksaw_route"
                          onChange={handleInputChange}
                        >
                          <option value="">-- Choose a route --</option>
                          {route.map((r) => (
                            <option key={r._id} value={r._id}>
                              {r.start_point} - {r.end_point}
                            </option>
                          ))}
                        </select>
                      </div>
        
                      {/* QR Assignment */}
                      <div className="mb-3">
                        <label htmlFor="qrSelect" className="form-label">
                          Assign QR
                        </label>
                        <select
                          className="form-select"
                          name="qr_assing_statu"
                          onChange={handleQrChange}
                        >
                          <option value="">-- Choose --</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                      </div>
        
                      {/* QR Input Box (conditionally rendered) */}
                      {showQrInput && (
                        <div className="mb-3">
                          <label htmlFor="qrInput" className="form-label">
                            Enter QR Code
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="qrInput"
                            name="qr_code"
                            onChange={handleInputChange}
                            placeholder="Enter QR code"
                          />
                        </div>
                      )}
                    </div>
        
                    {/* Modal footer with buttons */}
                    <div className="modal-footer bg-light">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleModalClose}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn btn-success"
                      >
                        Submit Route
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        };      
}
export default UpdateRoute;