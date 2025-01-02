import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../Component/Loader';
import DateDisplay from '../../../Component/DateDisplay';
import Brandcrump from '../../../Component/Brandcrump';
import GetTable from '../Table/GetTable';

const TodayReport = () => {
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
  console.log(zones);


  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1, // Serial number, based on index
      sortable: false,
      style: { textAlign: 'center' },
    },
    {
      name: 'Zone Name',
      selector: (row) => row.zone_id || 'N/A',
      sortable: false,
      style: { textAlign: 'center' },
    },
    {
      name: 'Name',
      selector: (row) => row.name || 'N/A',
      sortable: false,
      style: { textAlign: 'center' },
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobile_number || 'N/A',
      sortable: false,
      style: { textAlign: 'center' },
    },
    {
      name: 'Email',
      selector: (row) => row.email || 'N/A',
      sortable: false,
      style: { textAlign: 'center' },
    },
    {
      name: 'Designation',
      selector: (row) => row.designation || 'N/A',
      sortable: false,
      style: { textAlign: 'center' },
    },
    {
      name: 'Date Added',
      selector: (row) => <DateDisplay isoString={row.createdAt || 'N/A'} />,
      sortable: false,
      style: { textAlign: 'center' },
    },
    {
      name: 'Status',
      selector: (row) => row.status || 'N/A',
      sortable: false,
      style: { textAlign: 'center' },
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <button className="btn btn-primary btn-sm me-2">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </div>
      ),
      sortable: false,
      style: { textAlign: 'center' },
    },
  ];
  
  return (
    <>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Today Report"
          url="/dashboard"
          breadcrumb="Today Report"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">Today Report</h5>
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
                   <GetTable data={zones} columns={columns} title="Zones" />
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

export default TodayReport;
