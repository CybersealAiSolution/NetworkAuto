import React from 'react'
import './index.css';
import {Link, useLocation} from "react-router-dom"

const Sidebar = () => {
    const currentpath = useLocation().pathname;
    
    return (
        <div className="sidebarComponent">

                <div className="logoContainer">
                <img src="/softel-communications-logo-small.png" alt="MyImage" className="logo"  />
                </div>

                <div className="navigationContainer">
                    <div className="navigationSegment">
                        <Link className={`navigationButton ${currentpath==="/dashboard" ? "open":""}`} to="/dashboard"> <div className="navigationButtonLogoContainer"></div> Admins </Link>
                        <Link className={`navigationButton ${currentpath==="/dashboard/activity" ? "open":""}`} to="/dashboard/activity"> <div className="navigationButtonLogoContainer"></div> Activity  </Link>
                    </div>
                    <hr></hr>
                    <div className="navigationSegment">
                        <Link className={`navigationButton ${currentpath==="/dashboard/location" ? "open":""}`} to="/dashboard/location"> <div className="navigationButtonLogoContainer"></div> Locations </Link>
                        <Link className={`navigationButton ${currentpath==="/dashboard/devices" ? "open":""}`} to="/dashboard/devices"> <div className="navigationButtonLogoContainer"></div> Devices </Link>
                    </div>

                </div>
       
        </div>
    )
}

export default Sidebar