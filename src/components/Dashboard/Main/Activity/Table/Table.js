import React from "react";
import { useEffect, useState } from "react";
import { instance } from "./../../../../../Fetch";
import "./index.css";
import ReactModal from "react-modal";
import { MdInfo } from "react-icons/md";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [isJson, setIsJson] = useState(false);

  useEffect(() => {
    const geteventlogs = async () => {
      try {
        const response = await instance.get("/eventlogs/getevents");
        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          setData(response.data.data ? response.data.data : []);
        }
      } catch (error) {
        // Handle any errors that may occur during the API call
        console.error("Error sending data:", error);
      }
    };
    geteventlogs();
  }, []);

  const transformAndOpenModal = (details) => {
    try {
      const parsedDetails = JSON.parse(details.replace(/'/g, '"')); //replacing " by ' this was throwing error without this logic and parsing it in json
      console.log(parsedDetails);
      setSelectedDetails(parsedDetails);
      setIsJson(true);
    } catch (error) {
      //it will be catched when details is in string format
      setSelectedDetails(details);
      setIsJson(false);
    }
    setIsModalOpen(true);
  };
  console.log("selectedDetails", selectedDetails);
  const TableColumn = () =>
    data.reverse().map((item) => (
      <tr key={item.id} className={`log-level-${item.level.toLowerCase()}`}>
        <td>
          <input className="rowCheckbox" type="checkbox" />
        </td>
        <td>
          <b>{item.level}</b>
        </td>
        <td>{item.userName}</td>
        <td>
          <div style={{ width: "15rem", whiteSpace: "normal" }}>
            {item.description}
            {item.details ? (
              <MdInfo
                onClick={() => transformAndOpenModal(item.details)}
                style={{ color: "#007bff", cursor: "pointer" }}
              />
            ) : null}
          </div>
        </td>
        <td>
          <div style={{ width: "27rem", whiteSpace: "normal" }}>
            {item.summary}
          </div>
        </td>
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
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Details Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h3>Event Details</h3>
          <span className="close-button" onClick={() => setIsModalOpen(false)}>
            X
          </span>
        </div>
        <div className="modal-body">
          {isJson ? (
            <div>
              {selectedDetails.map((detail, index) => (
                <div key={index}>
                  <strong>Description:</strong> {detail.description}
                  <br />
                  <strong>Location ID:</strong> {detail.locationId}
                  <br />
                  <strong>Device Type:</strong> {detail.deviceType}
                  <br />
                  <strong>Device Value:</strong> {detail.deviceValue}
                  <br />
                  <br />
                </div>
              ))}
            </div>
          ) : (
            // <div>{selectedDetails}</div>
            <div>
              {typeof selectedDetails === "string" ? (
                <div>
                  {selectedDetails.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              ) : (
                <div>{selectedDetails}</div>
              )}
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
};

export default TableComponent;
