import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Main from './Main/Main';
import './index.css';
import { width } from "@mui/system";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Inline styles for dynamic width adjustment
    const headerAndMainStyle = {
        width: isSidebarOpen ? '84%' : `calc(100% - 90px)`,
        minWidth: isSidebarOpen ? `calc(100% - 280px)` : `calc(100% - 90px)`,
    };
    const sidebarStyle = {
        width: isSidebarOpen ? '16%' : '90px',
        minWidth: isSidebarOpen ? '280px' : '90px',
    };

    return (
    
        <div className='dashboard'>
            
            <div className='sidebar' style={sidebarStyle}> <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/> </div>
            <div className='headerAndMaincontainer' style={headerAndMainStyle}> 
                <div className='header'> <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/> </div>
                <div className='main'> <Main isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/> </div>
            </div>

        </div>
    );
}

export default Dashboard