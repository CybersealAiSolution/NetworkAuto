import React from 'react'
import './index.css'
import TableComponent from './Table/Table'

const Activity = () => {
    return (
        <div className="activityComponent">
        <div className="activityComponentHeader">
            <h1 className="activityComponentTitle">Activity</h1>
        </div>


        <div className='tableBox'>
                <TableComponent/>
        </div>


        
   
    </div>
    )
}

export default Activity