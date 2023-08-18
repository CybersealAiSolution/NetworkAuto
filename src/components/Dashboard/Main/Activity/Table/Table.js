import React from "react";
import { useEffect, useState } from "react";
import { instance } from "./../../../../../Fetch";
import "./index.css";

const TableComponent = () => {
  // const [error, setError] = useState(null);s
  const [data, setData] = useState([]);

  useEffect(() => {
    const geteventlogs = async () => {
      try {
        const response = await instance.get("/eventlogs/getevents");

        console.log("s", response.data);

        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          setData(response.data.data ? response.data.data : []);
          // navigate("/");
          console.log("first");
        }
      } catch (error) {
        // Handle any errors that may occur during the API call
        console.error("Error sending data:", error);
      }
    };
    geteventlogs();
  }, []);

  const TableColumn = () =>
    data.map((item) => (
      <tr key={item.id} className={`log-level-${item.level.toLowerCase()}`}>
        <td>
          <input className="rowCheckbox" type="checkbox" />
        </td>
        <td><b>{item.level}</b></td>
        <td>{item.userName}</td>
        <td>
          <div style={{ width: "50%x", whiteSpace: "normal" }}>
            {item.description}
          </div>
        </td>
        <td>
        <div style={{ width: "50%x", whiteSpace: "normal" }}>
        {item.summary}
          </div></td>
        <td>{item.created}</td>
      </tr>
    ));

  return (
    <div className="tableComponent">
      <div className="tableHeader">
        <div className="tableSearchContainer">
          <input
            className="tableSearch"
            placeholder="Search for Admins"
            type="text"
          />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input className="headerCheckbox" type="checkbox"></input>
              </th>
              <th>Level</th>
              <th>UserName</th>
              <th>Description</th>
              <th>Summary</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <TableColumn />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
