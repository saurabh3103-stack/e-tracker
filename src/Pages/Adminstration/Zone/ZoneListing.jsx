// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Loader from '../../../Component/Loader';
// import DateDisplay from '../../../Component/DateDisplay';
// import GetTable from '../../SubAdmin/Table/GetTable';
// const ZoneListing = () => {
//   // State definitions
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [zones, setZones] = useState([]);

//   // Fetch data function
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:3002/api/zones/', {
//         headers: {
//           'x-api-key': 'your_secret_key',
//         },
//       });
//       setZones(response.data);
//     } catch (err) {
//       setError('Failed to fetch zone data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   console.log(zones);

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchData();
//   }, []);


//   const columns = [
//       {
//         name: 'S.No',
//         selector: (row, index) => index + 1,
//         sortable: false,
//         style: { fontSize: '.9rem' },
//       },
//       {
//         name: 'Zone Name',
//         selector: (row) => row.zone_name || 'N/A',
//         sortable: true,
//         style: { fontSize: '.9rem' },
//       },
//       {
//         name: 'Region',
//         selector: (row) => row.zone_region || 'N/A',
//         sortable: true,
//         style: { fontSize: '.9rem' },
//       },
//       {
//         name: 'Date Added',
//         selector: (row) => <DateDisplay isoString={row.createdAt || 'N/A'} />,
//         sortable: true,
//         style: { fontSize: '.9rem' },
//       },
//       {
//         name: 'Status',
//         selector: (row) => row.status || 'N/A',
//         sortable: false,
//         style: { fontSize: '.9rem' },
//       },
//       {
//         name: 'Action',
//         selector: (row) => (
//           <div>
//             <button className="btn btn-primary btn-sm me-2">Edit</button>
//             <button className="btn btn-danger btn-sm">Delete</button>
//           </div>
//         ),
//         sortable: false,
//         style: { fontSize: '.9rem' },
//       },
//     ];

//   return (
//     <>
//       <div className="row gx-3">
//         <div className="col-sm-12">
//           <div className="card mb-3">
//             <div className="card-header bg-primary text-white">
//               <h5 className="card-title text-light m-0">Zone List</h5>
//             </div>
//             <div className="card-body">
//               {loading ? (
//                 <Loader />
//               ) : error ? (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               ) : (
//                 <div className="table-responsive">
// <GetTable
//                     data={zones}
//                     columns={columns}
//                     title={'Zone Management'}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ZoneListing;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../Component/Loader';
import DateDisplay from '../../../Component/DateDisplay';
import GetTable from '../Table/GetTable';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';

const ZoneListing = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zones, setZones] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState(null);
  const [viewData, setViewData] = useState({});
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/api/zones/', {
        headers: { 'x-api-key': 'your_secret_key' },
      });
      setZones(response.data);
    } catch (err) {
      setError('Failed to fetch zone data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (id) => {
    const selectedZone = zones.find((zone) => zone._id === id);
    if (selectedZone) {
      setViewData(selectedZone);
      setViewModalVisible(true);
    }
  };

  const handleEdit = (zone) => {
    setEditData(zone);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3002/api/zones/${editData._id}`, editData, {
        headers: { 'x-api-key': 'your_secret_key' },
      });
      toast.success('Zone updated successfully!');
      setEditModalVisible(false);
      fetchData(); // Refresh data after update
    } catch (err) {
      toast.error('Failed to update zone. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/api/zones/${id}`, {
        headers: { 'x-api-key': 'your_secret_key' },
      });
      toast.success('Zone deleted successfully!');
      setDeleteModalVisible(false);
      fetchData(); // Refresh data after delete
    } catch (err) {
      toast.error('Failed to delete zone. Please try again.');
    }
  };

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Zone Name',
      selector: (row) => row.zone_name || 'N/A',
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Region',
      selector: (row) => row.zone_region || 'N/A',
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Date Added',
      selector: (row) => <DateDisplay isoString={row.createdAt || 'N/A'} />,
      sortable: true,
      style: { fontSize: '.9rem' },
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
      name: 'Action',
      selector: (row) => (
        <div>
          <button
            className="btn btn-sm btn-info me-1"
            onClick={() => handleView(row._id)}
          >
            View
          </button>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              setZoneToDelete(row._id);
              setDeleteModalVisible(true);
            }}
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

  const handleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axios.put(
        `http://localhost:3002/api/zones/update-status/${id}`,
        { status: newStatus },
        {
          headers: {
            "x-api-key": "your_secret_key",
          },
        }
      );
      toast.success(`Status changed to ${newStatus} successfully!`, { autoClose: 3000 });
      fetchData();
    } catch (error) {
      toast.error("Failed to update status. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <>
      <div className="row gx-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-light m-0">Zone List</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <Loader />
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <div className="table-responsive">
                  <GetTable
                    data={zones}
                    columns={columns}
                    title={'Zone Management'}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModalVisible && (
        <Modal show onHide={() => setViewModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>View Zone Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Zone Name:</strong> {viewData.zone_name}</p>
            <p><strong>Region:</strong> {viewData.zone_region}</p>
            <p><strong>Zone ID:</strong> {viewData.zone_id}</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => setViewModalVisible(false)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Edit Modal */}
      {editModalVisible && (
        <Modal show onHide={() => setEditModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Zone</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Zone Name</label>
              <input
                type="text"
                name="zone_name"
                className="form-control"
                value={editData.zone_name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Region</label>
              <input
                type="text"
                name="zone_region"
                className="form-control"
                value={editData.zone_region || ''}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => setEditModalVisible(false)}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleEditSubmit}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalVisible && (
        <Modal show onHide={() => setDeleteModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Zone</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this zone?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => setDeleteModalVisible(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(zoneToDelete)}
            >
              Confirm
            </button>
          </Modal.Footer>
        </Modal>
      )}

      <ToastContainer />
    </>
  );
};

export default ZoneListing;
