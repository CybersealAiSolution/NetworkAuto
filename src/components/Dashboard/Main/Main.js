import React from 'react'
import Activity from './Activity/Activity';
import Location from './Location/Location';
import Admin from './Admin/Admin';
import { Route, Routes } from 'react-router-dom';
import AddAddress from '../../AddAddress/AddAddress';
import Devices from './Devices/Devices';
import DiscoveredDevices from './discoveredDevices/Devices';

import AddressDetailView from '../../AddressDetailView/AddressDetailView';
import PlaceDetailView from '../../PlaceDetailView/PlaceDetailView';
import TrustedIP from './TrustedIP/TrustedIP';

const Main = () => {
    return (
    
        <div className="mainContainer">
       
        
            <Routes> 
             <Route path=''exact element={<Admin/>}/>
             <Route path='add-address'exact element={<AddAddress/>}/>
             <Route path='activity' exact element={<Activity/>} /> 
             <Route path='location' exact element={<Location/>} /> 
             <Route path='deviceinventory' exact element={<Devices/>} /> 
             <Route path='discovereddevice' exact element={<DiscoveredDevices/>} /> 
             <Route path='trusted-ips' exact element={<TrustedIP/>} /> 
             <Route path='location/address/:id' exact element={<AddressDetailView/>} /> 
             <Route path='location/place/:id' exact element={<PlaceDetailView/>} /> 
            </Routes>
         
        
        </div>
      );
}

export default Main