import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../Component/Loader';
import DateDisplay from '../../../Component/DateDisplay';
import Brandcrump from '../../../Component/Brandcrump';
import { Link, useNavigate } from 'react-router-dom';
import GetTable from '../Table/GetTable';
import { Navigate } from 'react-router-dom';
const Verifier = () => {
  // State definitions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zones, setZones] = useState([]);
  const navigate = useNavigate();

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true);
      const adminId = localStorage.getItem('user_id');
      const response = await axios.get(
        `http://localhost:3002/api/verifier/`,
        {
          headers: {
            'x-api-key': 'your_secret_key',
          },
        },
      );
      setZones(response.data);
    } catch (err) {
      setError('Failed to fetch zone data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  const [modalData, setModalData] = useState(null); // State for modal data
  const [showModal, setShowModal] = useState(false);

  const handleView = (id) => {
    const selectedData = zones.find((zone) => zone._id === id);
    setModalData(selectedData); // Set the modal data
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
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
      selector: (row) => row.zone_name,
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobile,
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Designation',
      selector: (row) => row.designation,
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Date Added',
      selector: (row) => new Date(row.date_added).toLocaleDateString(),
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Status',
      selector: (row) => (
        <button
          className={`btn btn-sm ${
            row.status === 'active' ? 'btn-success' : 'btn-danger'
          }`}
          onClick={() =>
            toggleStatus(
              row._id,
              row.status === 'active' ? 'inactive' : 'active',
            )
          }
        >
          {row.status === 'active' ? 'Active' : 'Inactive'}
        </button>
      ),
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Action',
      responsive: true,
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
            type="button"
            className="btn btn-sm btn-warning me-1"
            onClick={() => handleEdit(row._id)}
          >
            Edit
          </button>
        </div>
      ),
      sortable: false,
    },
  ];
  const handleEdit = (id) => {
    alert(id);
    const selectedData = zones.find((zone) => zone._id === id);
    console.log(selectedData);
    navigate('/sub-admin/update-verifier', { state: selectedData });
  };
  return (
    <>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Verifier"
          url="/dashboard"
          breadcrumb="Verifier"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div
                class="card-header bg-primary text-white"
                style={{ padding: '.5rem 1rem' }}
              >
                <div class="row">
                  <div class="col-6">
                    <h5
                      class="card-title mb-0 text-light"
                      style={{
                        paddingTop: '.6rem !important',
                        marginTop: '2%',
                      }}
                    >
                      Verifier List
                    </h5>
                  </div>
                  <div class="col-6">
                    <Link
                      to={'/admin/add-verifier'}
                      class="btn btn-success float-end"
                    >
                      Add Verifier
                    </Link>
                  </div>
                </div>
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
                    <GetTable
                      data={zones}
                      columns={columns}
                      title="Zone Head Management"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && modalData && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Verifier Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Zone Name:</strong> {modalData.zone_name}
                </p>
                <p>
                  <strong>Name:</strong> {modalData.name}
                </p>
                <p>
                  <strong>Mobile:</strong> {modalData.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {modalData.email}
                </p>
                <p>
                  <strong>Designation:</strong> {modalData.designation}
                </p>
                <p>
                  <strong>Date Added:</strong>{' '}
                  <DateDisplay date={modalData.date_added} />
                </p>
                <p>
                  <strong>Status:</strong> {modalData.status}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Verifier;
