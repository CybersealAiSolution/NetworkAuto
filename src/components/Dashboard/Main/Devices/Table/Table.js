import { useState, useEffect, useRef } from "react";
import "./index.css";
import { instance } from "Fetch";
import { GrDocumentCsv } from "react-icons/gr";
import { toast } from "react-toastify";
import Pagination from "../../../../Pagination/Pagination";
import { saveAs } from 'file-saver'; // Import the saveAs function
import { useSelector } from "react-redux";
// GrDocumentCsv

const DeviceTableComponent = () => {
  const { roles } = useSelector((state) => state.users); // Use "state.users" here
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [deviceType, setDeviceType] = useState("");
  const [locationId, setLocationId] = useState("");
  const [childlocationId, setChildlocationId] = useState("");
  const [actuallyLocationID, setActuallyLocationID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [checkedRow, setCheckedRow] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.msTeamsStatus?.toLowerCase() === "not synced" &&
      (item.short_description
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
        item.model_id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        item.ip_address?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        item.BSSID?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        item.ChassisID?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery?.toLowerCase()))
    );
  });

  const handlePageChange = (pageNumber) => {
    console.log("changing....", pageNumber);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getDevices = async () => {
      try {
        const response = await instance.get(
          `/unSyncedDevices/?page=${currentPage}`
        );
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        setData(response.data.data ? response.data.data : []);
        setTotalPage(response.data.totalPages ? response.data.totalPages : 1);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    const getAddresses = async () => {
      try {
        const response = await instance.get(`/getEmergencyAddresses`);
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
    getAddresses();
    // eslint-disable-next-line
  }, [currentPage]);

  const selected_devices = () => {
    var devices = [];
    checkedRow.forEach((element) => {
      let deviceId = element.split("&")[1];
      const match = data
        ? data.filter((item) => {
            return item.id?.toLowerCase().includes(deviceId?.toLowerCase());
          })
        : [];
      devices.push(match[0]);
    });
    // console.log("devices",devices);
    return devices;
  };

  const selected_device_list = () => {
    return selected_devices().map((item) => {
      return (
        <div key={item.id} className="selected_Discovereddevice_list_items">
          {item.short_description}
        </div>
      );
    });
  };

  const handleCheckboxChange = (event) => {
    var { id, checked } = event.target;
    if (checked) {
      setCheckedRow((prevState) => [...prevState, id]);
      event.target.checked = true;
    } else {
      setCheckedRow((prevState) => prevState.filter((boxId) => boxId !== id));
      event.target.checked = false;
    }
  };

  const getPlaces = async (parentLocationID) => {
    try {
      const response = await instance.get(
        `/getlocationsdetail/places/${parentLocationID}`
      );
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      console.log("response.data", response.data);
      setPlaceList(response.data.places ? response.data.places : []);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deviceValue = selected_devices().map((item) => {
      if (deviceType === "Subnet") {
        return item.ip_address;
      } else if (deviceType === "Switch") {
        return item.ChassisID;
      } else if (deviceType === "Access Points") {
        return item.BSSID;
      } else {
        return "";
      }
    });

    if (selected_devices().length === 0) {
      toast.error("Please Select a device!!");
      setSidebarOpen(false);
      return;
    }

    const payload = {
      locationId: actuallyLocationID,
      deviceType: deviceType,
      description: selected_devices().map((item) => {
        return item.short_description;
      }),
      deviceValue: deviceValue,
    };

    try {
      const response = await instance.post(`/addbulkdevice`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response as needed
      if (response?.data.error) {
        alert(response.data.error);
        return;
      } else {
        toast.success("Request Accepted, Please wait few minutes!!");
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error sending data:", error);
    }

    setSidebarOpen(!isSidebarOpen);
  };

  const handleCSVDownload = async () => {
    try {
      const response = await instance.get("/getunSyncedDeviceCSV/", {
        responseType: 'blob', // Set responseType to 'blob'
      });
      console.log('xxxxxxxxxxxx')
      if (response.data.err_msg) {
        alert(response.data.err_msg);
        return;
      }

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });

      // Use the FileSaver library to save the Blob as a file
      saveAs(blob, 'unsynced_devices.csv'); // Change the filename as needed

    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const DeviceTableColumn = () =>
    filteredData?.map((item, index) => (
      <tr key={index}>
        <td>
          <input
            className="rowCheckbox"
            type="checkbox"
            checked={checkedRow.includes(`deviceinventory&${item.id}`)}
            id={`deviceinventory&${item.id}`}
            onChange={handleCheckboxChange}
          ></input>
        </td>
        <td>{item.short_description}</td>
        <td>{item.model_id}</td>
        <td>{item.ip_address}</td>
        <td>{item.BSSID}</td>
        <td>{item.ChassisID}</td>
        <td>{item.location}</td>
      </tr>
    ));

  return (
    <div className="tableComponent">
      <div className="tableHeader">
        {roles === "root" || roles === "ReadAndWrite" || roles === "admin" ? (
          <div
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="addbtn"
          >
            + Register Device
          </div>
        ) : (
          <div></div>
        )}
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
              <h2>Assign Device</h2>
              <form className="addUserForm" onSubmit={handleSubmit}>
                <div>
                  <div className="selected_Discovereddevice formElement">
                    <label className="selected_Discovereddevice_lable">
                      {" "}
                      Selected Device{" "}
                    </label>
                    <div className="selected_Discovereddevice_list">
                      {selected_device_list()}
                    </div>
                  </div>

                  <div className="formElement">
                    <label htmlFor="accessLevel">Choose Address</label>
                    <select
                      type="text"
                      name="locationId"
                      className="accessLevel"
                      value={locationId}
                      onChange={(e) => {
                        console.log("setval",e.target.value)
                        setLocationId(e.target.value);
                        setActuallyLocationID(e.target.value);
                        getPlaces(e.target.value);
                      }}
                      required
                    >
                      <option value="" disable>
                        Select an address
                      </option>
                      {addresses.map((i) => {
                        return (
                          <option key={i.locationId} value={i.locationId}>
                            {i.description}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {placeList.length !== 0 && (
                    <div className="formElement">
                      <label htmlFor="accessLevel">Choose Place</label>
                      <select
                        type="text"
                        name="childlocationId"
                        className="accessLevel"
                        value={childlocationId}
                        onChange={(e) => {
                          setChildlocationId(e.target.value);
                          setActuallyLocationID(e.target.value);
                          // setLocationId(e.target.value)
                        }}
                      >
                        <option value="" disable>
                          Select a place
                        </option>
                        {placeList.map((i) => {
                          return (
                            <option key={i.LocationId} value={i.LocationId}>
                              {i.Description}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  <div className="formElement">
                    <label>Select the Type</label>
                    <select
                      type="text"
                      name="deviceType"
                      className="deviceType"
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      required
                    >
                      <option value="" disable>
                        Select an address
                      </option>
                      <option value="Subnet">Subnet</option>
                      <option value="Switch">Switch</option>
                      <option value="Access Points">Access Points</option>
                    </select>
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GrDocumentCsv
            style={{ fontSize: "25px", marginTop: "5px", cursor: "pointer" }}
            onClick={handleCSVDownload}
          />

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
              <th>Subnet</th>
              <th>BSSID</th>
              <th>ChassisID</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <DeviceTableColumn />
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange} // Pass the function reference
      />
    </div>
  );
};

export default DeviceTableComponent;
