import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Main from './Main/Main';
import './index.css';

const Dashboard = () => {
    return (
    
        <div className='dashboard'>
            
            <div className='sidebar'> <Sidebar/> </div>
            <div className='headerAndMaincontainer'> 
                <div className='header'> <Header/> </div>
                <div className='main'> <Main/> </div>
            </div>

        </div>
      );
}

export default Dashboard