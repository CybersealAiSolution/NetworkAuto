import React from 'react'
import Botton from './Button/Button'
import TableComponent from './Table/Table'
import './index.css'


const Admin = () => {
    return (
        <div className="adminComponent">
            <div className="adminComponentHeader">
                <h1 className="adminComponentTitle">Admins</h1>
                <Botton/>
            </div>
            <div className='tableBox'>
                <TableComponent/>
            </div>
        </div>
    )
}

export default Admin