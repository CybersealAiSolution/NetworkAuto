import React from "react";
import "./index.css";
// import TableComponent from './Table/Table'
import TableComponent from "./Table/Table";

const TrustedIP = () => {
  return (
    <div className="activityComponent">
      <div className="activityComponentHeader">
        <h1 className="TableComponentTitle">Trusted IPs</h1>
      </div>

      <div className="tableBox">
        <TableComponent />
      </div>
    </div>
  );
};

export default TrustedIP;
