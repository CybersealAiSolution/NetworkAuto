import React from 'react'
import Activity from './Activity/Activity';
import Location from './Location/Location';
import Admin from './Admin/Admin';
import { Route, Routes } from 'react-router-dom';
import AddAddress from '../../AddAddress/AddAddress';
import Devices from './Devices/Devices';
import DiscoveredDevices from './discoveredDevices/Devices';
import LocationDetail from "./Location/LocationDetail";
import PlaceDetail from "./Location/LocationDetail/PlaceDetail";
import TrustedIP from './TrustedIP/TrustedIP';
import NotFoundPage from './PageNotFound';

const Main = () => {
    return (
    
        <div className="mainContainer">
       
        
            <Routes> 
                <Route path=''exact element={<Admin/>}/>
                <Route path='location/add-address'exact element={<AddAddress/>}/>
                <Route path='activity' exact element={<Activity/>} /> 
                <Route path='deviceinventory' exact element={<Devices/>} /> 
                <Route path='discovereddevice' exact element={<DiscoveredDevices/>} /> 
                <Route path='trusted-ips' exact element={<TrustedIP/>} /> 
                {/* <Route path='location/address/:id' exact element={<AddressDetailView/>} /> 
                <Route path='location/place/:id' exact element={<PlaceDetailView/>} />  */}
                <Route path='location' exact element={<Location/>} /> 
                <Route path="location/address/:id" exact element={<LocationDetail />} />
                <Route path="location/place/:id" exact element={<PlaceDetail />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
         
        
        </div>
      );
}

export default Main