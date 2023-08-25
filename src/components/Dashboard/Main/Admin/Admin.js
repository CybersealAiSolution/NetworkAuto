import React from 'react'
import TableComponent from './Table/Table'
import './index.css'


const Admin = () => {
    return (
        <div className="adminComponent">
            <div className="adminComponentHeader">
                <h1 className="TableComponentTitle">Admins</h1>
            </div>
            <div className='tableBox'>
                <TableComponent/>
            </div>
        </div>
    )
}

export default Admin