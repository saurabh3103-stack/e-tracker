import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../Component/Loader';
import DateDisplay from '../../../Component/DateDisplay';
const ZoneListing = () => {
  // State definitions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zones, setZones] = useState([]);

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/api/zones/', {
        headers: {
          'x-api-key': 'your_secret_key',
        },
      });
      setZones(response.data);
    } catch (err) {
      setError('Failed to fetch zone data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  console.log(zones);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

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
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered align-middle truncate m-0">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Zone Name</th>
                        <th>Region</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zones.length > 0 ? (
                        zones.map((zone, index) => (
                          <tr key={zone.id || index}>
                            <td>{index + 1}</td>
                            <td>{zone.zone_name || 'N/A'}</td>
                            <td>{zone.zone_region || 'N/A'}</td>
                            <td>
                              <DateDisplay
                                isoString={zone.createdAt || 'N/A'}
                              />
                            </td>
                            <td>{zone.status || 'N/A'}</td>
                            <td>
                              {/* Action buttons can be added here */}
                              <button className="btn btn-primary btn-sm me-2">
                                Edit
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No zones found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZoneListing;
