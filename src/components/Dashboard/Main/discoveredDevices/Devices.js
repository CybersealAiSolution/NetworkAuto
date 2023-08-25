import React from 'react'
import './index.css'
import TableComponent from '../discoveredDevices/Table/Table'
// import Botton from './Button/Button'

const Devices = () => {
  return (
    <div className="adminComponent">
        <div className="adminComponentHeader">
            <h1 className="TableComponentTitle">Devices Inventory</h1>
        </div>
        <div className='tableBox'>
            <TableComponent/>
        </div>
    </div>
)
}

export default Devices