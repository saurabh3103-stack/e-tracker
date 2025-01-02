import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetTable from '../Table/GetTable';
import Brandcrump from '../../../Component/Brandcrump';
const SubAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [admin, setAdmin] = useState([]);
  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1, // Dynamically generates serial numbers
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Zone',
      selector: (row) => row.zone_name || row.zone_name, // Handles both `starting_point` and `start_point` keys
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Admin Name',
      selector: (row) => row.admin_name || row.admin_name, // Handles both `starting_point` and `start_point` keys
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
      name: 'Status',
      selector: (row) => (
        <>
          {row.status === 'active' ? (
            <button className="btn btn-danger btn-sm">Inactive</button>
          ) : (
            <button className="btn btn-success btn-sm">Active</button>
          )}
        </>
      ),
      sortable: false,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Date',
      selector: (row) => new Date(row.createdAt).toLocaleDateString(), // Formats the created date
      sortable: true,
      style: { fontSize: '.9rem' },
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <button
            type="button"
            className="btn btn-sm btn-info me-1"
            onClick={() => handleShow(row._id)}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-sm btn-warning me-1"
            onClick={() => handleShowEdit(row._id)}
          >
            Edit
          </button>
          {row.status === 0 ? (
            <button
              type="button"
              className="btn btn-sm btn-success mr-1"
              onClick={() => activeStatus(row._id)}
            >
              Active
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => updateStatus(row._id)}
            >
              Inactive
            </button>
          )}
        </div>
      ),
      sortable: false,
    },
  ];
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/api/admin/', {
        headers: {
          'x-api-key': 'your_secret_key',
        },
      });

      setAdmin(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(admin);
  return (
    <>
      <div class="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Sub Admin User"
          url="/dashboard"
          breadcrumb="Sub Admin User"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">
                  E-Rickshaw Route List
                </h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <GetTable
                      data={admin}
                      columns={columns}
                      title={'Sub Admin'}
                    ></GetTable>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubAdmin;
