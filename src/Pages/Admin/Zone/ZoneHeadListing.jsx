import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Component/Loader";
import DateDisplay from '../../../Component/DateDisplay';
import GetTable from "../Table/GetTable";

import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ZoneHeadListing = () => {
  // State definitions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [zones, setZones] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    aadhaar_number: "",
    address: "",
    designation: "",
    mobile_number: "",
    email: "",
    password: "",
    zone_id: "",
  });

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3002/api/zonehead", {
        headers: {
          "x-api-key": "your_secret_key", 
        },
      });
      setZones(response.data);
    } catch (err) {
      setError("Failed to fetch zone data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);
console.log(zones);

const [modalVisible, setModalVisible] = useState(false);

const [zoneHeadID,setZoneHeadID]=useState('');

const handleEdit = (row,rowID) => {
  console.log("handle edit",row,rowID)
  setZoneHeadID(rowID)
  setFormData({
    name: row.name,
    dob: row.dob,
    aadhaar_number: row.aadhaar_number,
    address: row.address,
    designation: row.designation,
    mobile_number: row.mobile_number,
    email: row.email,
    password: "", // Keep empty for security reasons
    zone_id: row.zone_id,
    
  });
  setModalVisible(true)
};



const handleStatus = async (id, currentStatus) => {
  try {
    // Determine the new status
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    // Make the API call with the new status
    const response = await axios.put(
      `http://localhost:3002/api/zonehead/status/${id}`,
      { status: newStatus }, // Send the new status in the request body
      {
        headers: {
          "x-api-key": "your_secret_key",
        },
      }
    );

    console.log("Status Updated:", response.data);

    // Optionally refresh the data or update the status in your local state
    toast.success(`Status changed to ${newStatus} successfully!`, { autoClose: 3000 });
    fetchData()
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to update status. Please try again.", { autoClose: 3000 });
  }
};



const columns = [
  {
    name: "S.No",
    selector: (row, index) => index + 1,
    sortable: false,
    style: { fontSize: ".9rem" },
  },
  {
    name: "Zone Name",
    selector: (row) => row.zone_id || "N/A",
    sortable: true,
    style: { fontSize: ".9rem" },
  },
  {
    name: "Name",
    selector: (row) => row.name || "N/A",
    sortable: true,
    style: { fontSize: ".9rem" },
  },
  {
    name: "Mobile",
    selector: (row) => row.mobile_number || "N/A",
    sortable: true,
    style: { fontSize: ".9rem" },
  },
  {
    name: "Email",
    selector: (row) => row.email || "N/A",
    sortable: true,
    style: { fontSize: ".9rem" },
  },
  {
    name: "Designation",
    selector: (row) => row.designation || "N/A",
    sortable: true,
    style: { fontSize: ".9rem" },
  },
  {
    name: "Date Added",
    selector: (row) => <DateDisplay isoString={row.createdAt || "N/A"} />,
    sortable: true,
    style: { fontSize: ".9rem" },
  },
  {
    name: "Status",
    selector: (row) => (
      <button
        className={`btn btn-sm ${
          row.status === "active" ? "btn-success" : "btn-danger"
        }`}
        onClick={() => handleStatus(row._id, row.status)} // Pass current status here
      >
        {row.status === "active" ? "Active" : "Inactive"}
      </button>
    ),
    sortable: false,
    style: { fontSize: ".9rem" },
  },
  {
    name: "Action",
    selector: (row) => (
      <div>

<button
            type="button"
            className="btn btn-sm btn-info me-1"
            onClick={() => handleView(row._id)}
          >
            View
          </button>
         <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => handleEdit(row,row._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => openDeleteModal(row._id)}
          >
            Delete
          </button>
      </div>
    ),
    ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    sortable: false,
    style: { fontSize: ".9rem" },
  },
];


const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedRowID, setSelectedRowID] = useState(null);
const [viewModalVisible, setViewModalVisible] = useState(false);
const [viewData, setViewData] = useState({});

const handleView = (id) => {
  const selectedZoneHead = zones.find((zone) => zone._id === id);
  if (selectedZoneHead) {
    setViewData(selectedZoneHead);
    setViewModalVisible(true);
  }
};


// Function to open the delete modal and set the selected row ID
const openDeleteModal = (rowID) => {
  setSelectedRowID(rowID);
  setShowDeleteModal(true);
};

// Function to close the delete modal
const closeDeleteModal = () => {
  setShowDeleteModal(false);
  setSelectedRowID(null);
};

// Function to handle the delete action
const handleDelete = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3002/api/zonehead/delete/${selectedRowID}`,
      {
        headers: {
          "x-api-key": "your_secret_key",
        },
      }
    );
   console.log("Delete Successful:", response.data);
     
       toast.success("Verifier deleted successfully!", { autoClose: 3000 });
       fetchData()
   
       closeDeleteModal();
    // Optionally refresh the data or remove the deleted row from your state
  } catch (error) {
    console.error("Error deleting zone head:", error);
        toast.error("Failed to delete the verifier. Please try again.", { autoClose: 3000 });
        closeDeleteModal();
  }
};

const handleSubmit = async () => {
  try {
    const response = await axios.put(
      `http://localhost:3002/api/zonehead/update/${zoneHeadID}`,
      {
        name: formData.name,
        dob: formData.dob,
        aadhaar_number: formData.aadhaar_number,
        address: formData.address,
        designation: formData.designation,
        mobile_number: formData.mobile_number,
        email: formData.email,
        password: formData.password,
        zone_id: formData.zone_id,
        added_by:"admin",
    added_id: localStorage.getItem("user_id")
      },
      {
        headers: {
          "x-api-key": "your_secret_key",
          "Content-Type": "application/json",
        },
      }
    );
 
     
       toast.success("Verifier deleted successfully!", { autoClose: 3000 });
       fetchData()
    setModalVisible(false);
  } catch (error) {
    console.error("Error deleting zone head:", error);
        toast.error("Failed to delete the verifier. Please try again.", { autoClose: 3000 });
   
  }
};
  return (
    <>
     <ToastContainer />
      <div className="row gx-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-light m-0">Zone Head</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <Loader />
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div className="table-responsive">
                  <GetTable data={zones} columns={columns} title={"Zone Management"} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Zone Head</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Aadhaar Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.aadhaar_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aadhaar_number: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          designation: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.mobile_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobile_number: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

<Modal show={showDeleteModal} onHide={closeDeleteModal}>
<ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this zone head? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeDeleteModal}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Confirm Delete
          </button>
        </Modal.Footer>
      </Modal>

      {viewModalVisible && (
  <Modal show onHide={() => setViewModalVisible(false)}>
    <Modal.Header closeButton>
      <Modal.Title>View Zone Head Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="mb-3">
        <strong>Name:</strong> {viewData.name || "N/A"}
      </div>
      <div className="mb-3">
        <strong>Date of Birth:</strong> {viewData.dob || "N/A"}
      </div>
      <div className="mb-3">
        <strong>Aadhaar Number:</strong> {viewData.aadhaar_number || "N/A"}
      </div>
      <div className="mb-3">
        <strong>Address:</strong> {viewData.address || "N/A"}
      </div>
      <div className="mb-3">
        <strong>Designation:</strong> {viewData.designation || "N/A"}
      </div>
      <div className="mb-3">
        <strong>Mobile Number:</strong> {viewData.mobile_number || "N/A"}
      </div>
      <div className="mb-3">
        <strong>Email:</strong> {viewData.email || "N/A"}
      </div>
      <div className="mb-3">
        <strong>Zone ID:</strong> {viewData.zone_id || "N/A"}
      </div>
    </Modal.Body>
    <Modal.Footer>
      <button
        className="btn btn-secondary"
        onClick={() => setViewModalVisible(false)}
      >
        Close
      </button>
    </Modal.Footer>
  </Modal>
)}

      
    </>
  );
};

export default ZoneHeadListing;