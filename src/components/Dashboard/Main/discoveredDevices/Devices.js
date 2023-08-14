import React from 'react'
import './index.css'
import TableComponent from '../discoveredDevices/Table/Table'
// import Botton from './Button/Button'

const Devices = () => {
  return (
    <div className="adminComponent">
        <div className="adminComponentHeader">
            <h1 className="adminComponentTitle">Discovered Devices</h1>
            {/* <Botton/> */}
        </div>
        <div className='tableBox'>
            <TableComponent/>
        </div>
    </div>
)
}

export default Devices