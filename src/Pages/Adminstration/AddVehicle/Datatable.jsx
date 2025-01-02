import React from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DataTableWithExport = ({ users }) => {
  const columns = [
    { name: "S.No.", selector: (row, index) => index + 1, sortable: true },
    { name: "ID", selector: (row) => row.e_rickshaw, sortable: true },
    {
      name: "Rickshaw Photo",
      cell: (row) => (
        <img
          src={`${row.imageUrl}${row.rickshaw_photo}`}
          alt="Rickshaw"
          style={{ height: "120px", width: "120px" }}
        />
      ),
    },
    {
      name: "Rickshaw Details",
      cell: (row) => (
        <div>
          <p>
            <strong>Rickshaw Number:</strong> {row.e_rickshaw}
          </p>
          <p>
            <strong>Chassis Number:</strong> {row.chassis}
          </p>
          <p>
            <strong>Fitness Expire:</strong> {row.fitness_expire}
          </p>
        </div>
      ),
    },
    {
      name: "Owner Details",
      cell: (row) => (
        <div>
          <p>
            <strong>Name:</strong> {row.owner_name}
          </p>
          <p>
            <strong>Email:</strong> {row.email}
          </p>
          <p>
            <strong>Mobile:</strong> {row.phone_owner}
          </p>
          <p>
            <strong>Address:</strong> {`${row.address_line_f} ${row.address_line_t}`}
          </p>
        </div>
      ),
    },
    { name: "Route", selector: (row) => row.e_ricksaw_route || "No route assigned" },
    { name: "QR Status", selector: (row) => row.qr_assing_statu },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-info btn-sm"
            onClick={() => handleShow(row._id)}
          >
            View
          </button>
          {row.e_ricksaw_route ? (
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleModalOpen(row._id)}
            >
              Update Route
            </button>
          ) : (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => handleModalOpen(row._id)}
            >
              Assign Route
            </button>
          )}
          {row.status === 0 ? (
            <button
              className="btn btn-success btn-sm"
              onClick={() => activeStatus(row._id)}
            >
              Active
            </button>
          ) : (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => updateStatus(row._id)}
            >
              Inactive
            </button>
          )}
        </div>
      ),
    },
  ];

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rickshaw Data", 20, 10);
    doc.autoTable({
      columns: columns.map((col) => ({ header: col.name, dataKey: col.selector })),
      body: users,
    });
    doc.save("rickshaw-data.pdf");
  };

  // CSV Data
  const csvData = users.map((user, index) => ({
    SNo: index + 1,
    ID: user.e_rickshaw,
    OwnerName: user.owner_name,
    Email: user.email,
    Route: user.e_ricksaw_route || "No route assigned",
    QRStatus: user.qr_assing_statu,
  }));

  return (
    <div>
      <div className="d-flex mb-3">
        <button className="btn btn-primary me-2" onClick={exportPDF}>
          Export as PDF
        </button>
        <CSVLink data={csvData} filename="rickshaw-data.csv" className="btn btn-success">
          Export as CSV
        </CSVLink>
      </div>
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        selectableRows
      />
    </div>
  );
};

export default DataTableWithExport;
