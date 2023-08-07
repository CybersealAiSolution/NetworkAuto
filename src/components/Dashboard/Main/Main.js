import React from 'react'
import Activity from './Activity/Activity';
import Location from './Location/Location';
import Admin from './Admin/Admin';
import { Route, Routes } from 'react-router-dom';
import AddAddress from '../../AddAddress/AddAddress';

const Main = () => {
    return (
    
        <div className="mainContainer">
       
        
            <Routes> 
             <Route path=''exact element={<Admin/>}/>
             <Route path='add-address'exact element={<AddAddress/>}/>
             <Route path='activity' exact element={<Activity/>} /> 
             <Route path='location' exact element={<Location/>} /> 
            </Routes>
         
        
        </div>
      );
}

export default Main