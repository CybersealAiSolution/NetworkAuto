import "./index.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {instance} from 'Fetch'
import {SetUserState} from 'action'

const Header = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


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
    if (response.status===201) {
      toast.success('Request Accepted, Please wait few minutes!!');
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
        <div className="currentUserDetail">
          {data.userDisplayName}
          <div className="useremailinfo">{data.user}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps=(states)=>{
  return( {UserStates:states.UserStates} )
}

export default connect(mapStateToProps,{SetUserState})(Header)