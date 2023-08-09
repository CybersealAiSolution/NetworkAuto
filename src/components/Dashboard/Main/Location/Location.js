import React from "react";
import "./index.css";
import TableComponent from "./Table/Table";

const Location = () => {
  return (
    <div className="locationComponent">
      <div className="locationComponentHeader">
        <h1 className="locationComponentTitle">Locations</h1>
      </div>
      <div className="tableBox">
        <TableComponent />
      </div>
    </div>
  );
};

export default Location;
