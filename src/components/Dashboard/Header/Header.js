import "./index.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { instance } from "Fetch";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

const Header = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlankDivVisible, setIsBlankDivVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("second");
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
      const response = await instance.get("logout");
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

  const handleSubmit = async (e) => {
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
        toast.success("Request Accepted, Please wait few minutes!!");
        window.history.back();
      }
      if (response.data.error) {
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

        <div className="currentUserProfile"></div>
        <div
          className="currentUserDetail"
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
                  setShowDeleteModal(true);
                  setIsBlankDivVisible(!isBlankDivVisible);
                }}
              >
                User Credentials
              </li>
              <li className="dropdown-item" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <ReactModal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
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
          <form onSubmit={handleSubmit} className="">
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
    </div>
  );
};

export default Header;
