import React from 'react'
import TableComponent from './Table/Table'
import './index.css'

const NumberInventory = () => {
    return (
        <div className="didComponent">
            <div className="didComponentHeader">
                <h1 className="didComponentTitle">Number Inventory</h1>
            </div>
            <div className='tableBox'>
                <TableComponent/>
            </div>
   
        </div>
    )
}

export default NumberInventory