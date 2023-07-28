import React from 'react'
import Activity from './Activity/Activity';
import NumberInventory from './NumberInventory/NumberInventory';
import UserManagement from './UserManagement/UserManagement';
import Location from './Location/Location';
import ResourceAccount from './ResourceAccount/ResourceAccount';
import CallQueue from './CallQueue/CallQueue';
import AutoAttendent from './AutoAttendent/AutoAttendent';
import Admin from './Admin/Admin';
import { Route, Routes } from 'react-router-dom';

const Main = () => {
    return (
    
        <div className="mainContainer">
       
        
            <Routes> 
             <Route path=''exact element={<Admin/>}/>
             <Route path='activity' exact element={<Activity/>} /> 
             <Route path='dids' exact element={<NumberInventory/>} /> 
             <Route path='users' exact element={<UserManagement/>} /> 
             <Route path='location' exact element={<Location/>} /> 
             <Route path='resourceaccount' exact element={<ResourceAccount/>} /> 
             <Route path='callqueue' exact element={<CallQueue/>} /> 
             <Route path='autoattendent' exact element={<AutoAttendent/>} /> 
            </Routes>
         
        
        </div>
      );
}

export default Main