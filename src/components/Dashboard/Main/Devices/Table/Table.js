import { useState, useEffect, useRef } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { instance } from "../../../../../Fetch";

const DeviceTableComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [unsyncDevice, setUnsyncDevice] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [description, setDescription] = useState("");
  const [ip_address, setIp_address] = useState("");
  const [locationId, setLocationId] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.short_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.model_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ip_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.BSSID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ChassisID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.msTeamsStatus.toLowerCase().includes("not synced") ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    const getDevices = async () => {
      try {
        const response = await instance.get("/devices/");
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        setData(response.data ? response.data : []);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    const getUnsyncedDevices = async () => {
      try {
        const response = await instance.get("/getAllUnsyncedDevices");
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        setUnsyncDevice(response.data ? response.data : []);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    const getAddresses = async () => {
      try {
        const response = await instance.get("/getEmergencyAddresses");
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        setAddresses(response.data.data ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    getDevices();
    getUnsyncedDevices();
    getAddresses();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      locationId: locationId,
      ipAddress: ip_address,
      description: description,
    };

    try {
      const response = await instance.post(`/add_unsynced_device`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response as needed
      console.log("result", response.data);
      if (response?.data.error) {
        alert(response.data.error);
        return;
      } else {
        console.log("first");
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error sending data:", error);
    }

    setSidebarOpen(!isSidebarOpen);
  };

  const DeviceTableColumn = () =>
    filteredData?.map((item, index) => (
      <tr key={index}>
        <td>
          <input className="rowCheckbox" type="checkbox"></input>
        </td>
        <td>{item.short_description}</td>
        <td>{item.model_id}</td>
        <td>{item.ip_address}</td>
        <td>{item.BSSID}</td>
        <td>{item.ChassisID}</td>
        <td
        style={{
          color: item.msTeamsStatus === 'Synced' ? 'green' : 'red',
        }}
      >{item.msTeamsStatus}</td>
        <td>{item.location}</td>
      </tr>
    ));

  return (
    <div className="tableComponent">
      <div className="tableHeader">
        <div onClick={() => setSidebarOpen(!isSidebarOpen)} className="addbtn">
          + Unsynced Data
        </div>
        {isSidebarOpen && (
          <>
            <div className="overlay"></div>
            <div className="sidebar2" ref={sidebarRef}>
              <div
                className="closeSidebar2"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                X
              </div>
              <h2>Add Device</h2>
              <form className="addUserForm" onSubmit={handleSubmit}>
                <div>
                  <label for="accessLevel">Choose Address</label>
                  <select
                    type="text"
                    name="locationId"
                    className="accessLevel"
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select an address
                    </option>
                    {addresses.map((i) => {
                      return (
                        <option value={i.locationId}>{i.fulladdress}</option>
                      );
                    })}
                  </select>
                  <label for="accessLevel">Choose Device</label>
                  <select
                    type="text"
                    name="ip_address"
                    className="accessLevel"
                    value={ip_address}
                    onChange={(e) => {
                      setIp_address(e.target.value);
                      const existingDesc = unsyncDevice.find(
                        (i) => i.ip_address === e.target.value
                      );
                      if (existingDesc) {
                        setDescription(existingDesc["short_description"]);
                      } else {
                        setDescription(""); // Set description to an empty string if no matching device found
                      }
                    }}
                    required
                  >
                    <option value="" disabled>
                      Select a Device
                    </option>
                    {unsyncDevice.map((i) => {
                      return (
                        <option id="FullAccess" value={i.ip_address}>
                          {i.ip_address}
                        </option>
                      );
                    })}
                  </select>
                  <div className="AccessLevelFormDivision adminFormElement">
                    <label for="Description">Description</label>
                    <input
                      type="text"
                      name="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="Description"
                      placeholder="Add a description so you know why it was created"
                      required
                    ></input>
                  </div>
                </div>
                <input
                  type="submit"
                  className="addAdminFormSubmit"
                  value="Submit"
                ></input>
              </form>
            </div>
          </>
        )}
        <div className="tableSearchContainer">
          <input
            className="tableSearch"
            placeholder="Search for Devices"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
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
              <th>Description</th>
              <th>Model ID</th>
              <th>IP Address</th>
              <th>BSSID</th>
              <th>ChassisID</th>
              <th>MsTeams Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <DeviceTableColumn />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceTableComponent;