import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../Component/Loader";
import DateDisplay from '../../../Component/DateDisplay';
import Brandcrump from '../../../Component/Brandcrump';

const AllReport = () => {
  // State definitions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [zones, setZones] = useState([]);

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
  return (
    <>
    <div className="dashboard-main-body">
        <Brandcrump 
            pageName="Dashboard" 
            title="All Report" 
            url="/dashboard" 
            breadcrumb="All Report" 
        /> 
      <div className="row gx-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-light m-0">All Report</h5>
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
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Designation</th>
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
                            <td>{zone.zone_id || "N/A"}</td>
                            <td>{zone.name || "N/A"}</td>
                            <td>{zone.mobile_number || "N/A"}</td>
                            <td>{zone.email || "N/A"}</td>
                            <td>{zone.designation || "N/A"}</td>
                            <td>
                              <DateDisplay isoString={zone.createdAt || "N/A"} />
                            </td>
                            <td>{zone.status || "N/A"}</td>
                            <td>
                              {/* Action buttons can be added here */}
                              <button className="btn btn-primary btn-sm me-2">Edit</button>
                              <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
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
      </div>
    </>
  );
};

export default AllReport;
