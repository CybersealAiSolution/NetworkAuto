import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Main from './Main/Main';
import './index.css';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Inline styles for dynamic width adjustment
    const headerAndMainStyle = {
        width: isSidebarOpen ? '80%' : '400%',
    };

    return (
    
        <div className='dashboard'>
            
            <div className='sidebar'> <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/> </div>
            <div className='headerAndMaincontainer' style={headerAndMainStyle}> 
                <div className='header'> <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/> </div>
                <div className='main'> <Main isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/> </div>
            </div>

        </div>
    );
}

export default Dashboard