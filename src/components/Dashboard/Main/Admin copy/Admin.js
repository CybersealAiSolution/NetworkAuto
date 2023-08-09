import React from 'react'
import TableComponent from './Table/Table'
import './index.css'


const Admin = () => {
    return (
        <div className="adminComponent">
            <div className="adminComponentHeader">
                <h1 className="adminComponentTitle">SNMP</h1>
                {/* <Botton/> */}
            </div>

            <div className='Snmpcard'>
                <div><b>SNMP last synced on : </b> 09/Aug/2023:15:55:23 </div> 
                <div><b>SNMP synced Scheduled on : </b> 10/Aug/2023:16:00:00 </div> 
                <div><b>Device descovered : </b> 9</div>
                <div><b>Offline devices : </b> 1 </div>  
            </div>
            <div className='tableBox'>
                <TableComponent/>
            </div>
        </div>
    )
}

export default Admin