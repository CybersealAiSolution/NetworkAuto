import "./index.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { instance } from "Fetch";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

const Header = ({isSidebarOpen,setIsSidebarOpen}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlankDivVisible, setIsBlankDivVisible] = useState(false);
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showServiceNowModal, setShowServiceNowModal] = useState(false);
  const [instanceName, setInstanceName] = useState("");
  const [userName, setUserName] = useState("");
  const [serviceNowpassword, setServiceNowPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAppInfo = async () => {
      try {
        const response = await instance.get("/getAppInfo");
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    getAppInfo();
  }, []);

  const handleSyncing = async () => {
    setIsLoading(true);

    const response = await instance.get("/msteams/resyncteams");
    if (response.status === 201) {
      toast.success("Request Accepted, Please wait few minutes!!");
    } else {
      console.log(response.data.error);
      toast.error("Internal Server Error!!");
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      console.log("syncing....");
    }, 3000); // 5 seconds
  };

  const handleLogout = async () => {
    try {
      const response = await instance.get("signout");
      if (response.status === 200) {
        navigate("/");
        toast.success("Successfully Logged out!!");
      } else {
        console.error("Logout failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      password: password,
      userName: email
    };
    try {
      console.log(payload);
      const response = await instance.post("/setCredentails", payload);
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);
        setShowTeamsModal(!showTeamsModal);
      }
      if (response.data.error) {
        toast.error(response.data.message);
        console.log(response.data.error);
        return;
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // service now Credentials submit
  const handleServiceNowSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      instanceName: instanceName,
      userName: userName,
      password: serviceNowpassword
    };
    try {
      console.log(payload);
      const response = await instance.post("/setServiceNowCredentails", payload);
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);
        setShowServiceNowModal(!showServiceNowModal);
      }
      if (response.data.error) {
        toast.error(response.data.message);
        console.log(response.data.error);
        return;
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="headerComponent">
      <div className="organizationName">
        {" "}
        <h3>
          <b>{data.tenantName}</b>
        </h3>
      </div>

      <div className="CurrentUserContainer">
        <div>
          {isLoading && (
            <div className="loading-container">
              <img
                src="https://i.gifer.com/ZKZg.gif"
                alt="loading"
                className="loading-gif"
              />
            </div>
          )}
          <button onClick={handleSyncing}>
            <span>Sync</span>
          </button>
        </div>
        {data.userDisplayName && <img className="currentUserProfile" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />}
        <div
          className="currentUserDetail"
          style={{cursor:'pointer'}}
          onClick={() => setIsBlankDivVisible(!isBlankDivVisible)}
        >
          {data.userDisplayName}
          <div className="useremailinfo">{data.user}</div>
        </div>
        {isBlankDivVisible && (
          <div className="dropdownlist">
            <ul className="dropdown-list">
              <li
                className="dropdown-item"
                onClick={() => {
                  setShowTeamsModal(true);
                  setShowServiceNowModal(false);
                  setIsBlankDivVisible(!isBlankDivVisible);
                }}
              >
                Ms Teams Credentials
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  setShowServiceNowModal(true);
                  setShowTeamsModal(false);
                  setIsBlankDivVisible(!isBlankDivVisible);
                }}
              >
                Service Now Credentials
              </li>
              <li className="dropdown-item" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <ReactModal
        isOpen={showTeamsModal}
        onRequestClose={() => setShowTeamsModal(false)}
        contentLabel="Delete Confirmation Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Overlay background color
          },
          content: {
            width: "600px", // Set the width of the modal
            height: "330px",
            margin: "auto", // Center the modal horizontally
            borderRadius: "8px", // Rounded corners
            padding: "20px", // Add some padding
          },
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>Enter Credentials</h3>
          <form onSubmit={handleTeamSubmit} className="">
            <div className="form-group">
              <label htmlFor="email">Default Admin/Root User*</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Type password*</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="createBtn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={showServiceNowModal}
        onRequestClose={() => setShowServiceNowModal(false)}
        contentLabel="Service Now Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Overlay background color
          },
          content: {
            width: "600px", // Set the width of the modal
            height: "380px",
            margin: "auto", // Center the modal horizontally
            borderRadius: "8px", // Rounded corners
            padding: "20px", // Add some padding
          },
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>Enter Service Now Credentials</h3>
          <form onSubmit={handleServiceNowSubmit} className="">
            <div className="form-group">
              <label htmlFor="email">Instance Name*</label>
              <input
                type="text"
                id="text"
                value={instanceName}
                placeholder="devXXXXX"
                onChange={(e) => setInstanceName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">UserName*</label>
              <input
                type="text"
                id="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Password*</label>
              <input
                type="password"
                id="password"
                value={serviceNowpassword}
                onChange={(e) => setServiceNowPassword(e.target.value)}
                required
              />
            </div>
            <div className="createBtn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default Header;
