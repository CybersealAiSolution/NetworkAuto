import React from 'react'
import './index.css';
import {Link, useLocation} from "react-router-dom"

const Sidebar = () => {
    const currentpath = useLocation().pathname;
    console.log(currentpath)
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
                        <Link className={`navigationButton ${currentpath==="/dashboard/dids" ? "open":""}`} to="/dashboard/dids"> <div className="navigationButtonLogoContainer"></div> Number Inventory </Link>
                        <Link className={`navigationButton ${currentpath==="/dashboard/users" ? "open":""}`} to="/dashboard/users"> <div className="navigationButtonLogoContainer"></div> User Management </Link>
                        <Link className={`navigationButton ${currentpath==="/dashboard/location" ? "open":""}`} to="/dashboard/location"> <div className="navigationButtonLogoContainer"></div> Locations </Link>
                    </div>
                    <hr></hr>
                    

                    <div className="navigationSegment">
                        <Link className={`navigationButton ${currentpath==="/dashboard/resourceaccount" ? "open":""}`} to="/dashboard/resourceaccount"> <div className="navigationButtonLogoContainer"></div> Resource Accounts </Link>
                        <Link className={`navigationButton ${currentpath==="/dashboard/callqueue" ? "open":""}`} to="/dashboard/callqueue"> <div className="navigationButtonLogoContainer"></div> Call Queue </Link>
                        <Link className={`navigationButton ${currentpath==="/dashboard/autoattendent" ? "open":""}`} to="/dashboard/autoattendent"> <div className="navigationButtonLogoContainer"></div> Auto Attendent </Link>
                    </div>
                </div>
       
        </div>
    )
}

export default Sidebar