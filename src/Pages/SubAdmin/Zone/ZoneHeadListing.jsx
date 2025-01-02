import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../Component/Loader';
import DateDisplay from '../../../Component/DateDisplay';
import GetTable from '../Table/GetTable';

const ZoneHeadListing = () => {
  // State definitions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zones, setZones] = useState([]);

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:3002/api/zonehead',
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


  const columns = [
      {
        name: 'S.No',
        selector: (row, index) => index + 1,
        sortable: false,
        style: { fontSize: '.9rem' },
      },
      {
        name: 'Zone Name',
        selector: (row) => row.zone_id || 'N/A',
        sortable: true,
        style: { fontSize: '.9rem' },
      },
      {
        name: 'Name',
        selector: (row) => row.name || 'N/A',
        sortable: true,
        style: { fontSize: '.9rem' },
      },
      {
        name: 'Mobile',
        selector: (row) => row.mobile_number || 'N/A',
        sortable: true,
        style: { fontSize: '.9rem' },
      },
      {
        name: 'Email',
        selector: (row) => row.email || 'N/A',
        sortable: true,
        style: { fontSize: '.9rem' },
      },
      {
        name: 'Designation',
        selector: (row) => row.designation || 'N/A',
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
        name: 'Status',
        selector: (row) => (
          <button
            className={`btn btn-sm ${
              row.status === 'active' ? 'btn-success' : 'btn-danger'
            }`}
            onClick={() => handleStatus(row._id, row.status)} // Pass current status here
          >
            {row.status === 'active' ? 'Active' : 'Inactive'}
          </button>
        ),
        sortable: false,
        style: { fontSize: '.9rem' },
      },
      // {
      //   name: 'Action',
      //   selector: (row) => (
      //     <div>
      //       <button
      //         className="btn btn-primary btn-sm me-2"
      //         onClick={() => handleEdit(row, row._id)}
      //       >
      //         Edit
      //       </button>
      //       <button
      //         className="btn btn-danger btn-sm"
      //         onClick={() => openDeleteModal(row._id)}
      //       >
      //         Delete
      //       </button>
      //     </div>
      //   ),
      //   ignoreRowClick: true,
      //   allowOverflow: true,
      //   button: true,
      //   sortable: false,
      //   style: { fontSize: '.9rem' },
      // },
    ];

  return (
    <>
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
    </>
  );
};

export default ZoneHeadListing;
