import React from "react";

const DateDisplay = ({ isoString }) => {
  const convertToDate = (isoString) => {
    return new Date(isoString).toLocaleDateString(); 
  };

  return <div>{convertToDate(isoString)}</div>;
};

export default function App() {
  return <DateDisplay isoString="2024-12-18T05:11:18.565Z" />;
}
