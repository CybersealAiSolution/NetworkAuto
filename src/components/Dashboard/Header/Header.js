import './index.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
    const [data, setData] = useState([]);


    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const instance = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': getCookie('csrftoken'),
        }
      });
    
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
        }
        getAppInfo();
      }, []);


    return (
        <div className="headerComponent">

            <div className="organizationName"> <h3><b>{data.tenantName}</b></h3></div>
            
            <div className="CurrentUserContainer">
                <div>
                    <div className="loading-container">
                        <img src="https://i.gifer.com/ZKZg.gif" alt="loading" className="loading-gif"/>
                    </div>
                    <div className='syncingLogotext'>SYNC</div>
                </div>
                <div className="currentUserProfile"></div>
                <div className="currentUserDetail">
                    {data.userDisplayName}
                    <div className='useremailinfo'>{data.user}</div>
                </div> 
            </div>
       
        </div>
    )
}

export default Header