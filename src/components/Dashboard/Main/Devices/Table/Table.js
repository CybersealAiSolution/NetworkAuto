import { useState, useEffect, useRef } from "react";
import "./index.css";
import { instance } from "../../../../../Fetch";

const DeviceTableComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [deviceType, setDeviceType] = useState("");
  const [locationId, setLocationId] = useState("");

  const [checkedRow, setCheckedRow] = useState([])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const filteredData = data.filter((item) => {
  //   return (
  //     item.short_description
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase()) ||
  //     item.model_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.ip_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.BSSID.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.ChassisID.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.msTeamsStatus.toLowerCase().includes("not synced") ||
  //     item.location.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // });

  const filteredData = data.filter(item => {
    return (
      item.msTeamsStatus.toLowerCase() === "not synced" && (
      item.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ip_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.BSSID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ChassisID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) )
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
    getAddresses();
    // eslint-disable-next-line
  }, []);


  const selected_devices =() => {
    var devices = []
    checkedRow.forEach(element =>{
      let deviceId = element.split("&")[1];
      const match = data?data.filter((item) => {
        return (
          item.id.toLowerCase().includes(deviceId.toLowerCase()) 
        );
      }):[]
      devices.push(match[0])
    })
    return devices 
  } 


  const selected_device_list=()=>{
    
      return selected_devices().map((item) => {
        return(
        <div key={item.id} className="selected_Discovereddevice_list_items">
          {item.short_description}
        </div>
        )});
  }
  


  const handleCheckboxChange = (event) => {

    var { id, checked } = event.target;
    if (checked) {
      setCheckedRow(prevState => [...prevState, id]);
      event.target.checked= true
  } else {
      setCheckedRow(prevState => prevState.filter(boxId => boxId !== id));
      event.target.checked= false
  }
};



  const handleSubmit = async (event) => {
    event.preventDefault();

  
    const deviceValue = selected_devices().map((item) => {
      if(deviceType==='Subnet'){
          return( item.ip_address )
      }
      else if(deviceType==='Switch'){
        return( item.ChassisID)
      }
      else if(deviceType==='Access Points'){
        return( item.BSSID )
      }
      else{
        return ""
      }
    })

    const payload = {
      locationId: locationId,
      deviceType: deviceType,
      description: selected_devices().map((item) => {
        return( item.short_description )}),
      deviceValue: deviceValue
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
          <input className="rowCheckbox" type="checkbox" checked={checkedRow.includes(`deviceinventory&${item.id}`)} id={`deviceinventory&${item.id}`} onChange={handleCheckboxChange}></input>
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
        <div onClick={() => setSidebarOpen(!isSidebarOpen)} className="addbtn">
          + Register Device
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
              <h2>Assign Device</h2>
              <form className="addUserForm" onSubmit={handleSubmit}>
                <div>
                  <div className="selected_Discovereddevice formElement">
                    <label className="selected_Discovereddevice_lable"> Selected Device </label>
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
                      onChange={(e) => setLocationId(e.target.value)}
                      required
                    >
                      <option value="" disable>
                        Select an address
                      </option>
                      {addresses.map((i) => {
                        return (
                          <option key={i.locationId} value={i.locationId}>{i.description}</option>
                        );
                      })}
                    </select>
                  </div>
                  

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
                      <option value="Subnet" >
                        Subnet
                      </option>
                      <option value="Switch" >
                        Switch
                      </option>
                      <option value="Access Points" >
                        Access Points
                      </option>

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