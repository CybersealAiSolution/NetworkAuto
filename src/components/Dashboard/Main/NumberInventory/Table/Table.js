import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './index.css'

const TableComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const tableCol0 = useRef()
    const tableCol1 = useRef()
    const tableCol2 = useRef()


    useEffect(() => {
        // Function to fetch data using Axios
        const fetchData = async () => {
        try {
            const response = await axios.get('');
            setData(response.data);
            
        } catch (err) {
            setError(err);
            console.log('error -> ',error);
        }
    };
    
    fetchData();
    }, [error]);


    if(data){
        
        tableCol0.current.innerHTML = '';
        tableCol1.current.innerHTML = '';
        tableCol2.current.innerHTML = '';

        const Col0header = document.createElement('div');
        Col0header.className =  "colHeader"
        Col0header.textContent = "Number"
        const Col1header = document.createElement('div');
        Col1header.className =  "colHeader"
        Col1header.textContent = "Number Type"
        const Col2header = document.createElement('div');
        Col2header.className =  "colHeader"
        Col2header.textContent = "Provided By"
        const Col3header = document.createElement('div');
        Col2header.className =  "colHeader"
        Col2header.textContent = "Status"

        tableCol0.current.appendChild(Col0header)
        tableCol1.current.appendChild(Col1header)
        tableCol2.current.appendChild(Col2header)
        tableCol2.current.appendChild(Col3header)

        


        let row = 0;

        data.user_list.forEach(user => {

            const Col0row = document.createElement('div');
            Col0row.className =  "row"
            Col0row.textContent = user.userName
            const Col1row = document.createElement('div');
            Col1row.className =  "row"
            Col1row.textContent = user.roles
            const Col2row = document.createElement('div');
            Col2row.className =  "row"
            const Col3row = document.createElement('div');
            Col2row.className =  "row"

            console.log(tableCol0.current.className)
            // <div className="row" id={`row${row}`}>row1</div>
            tableCol0.current.appendChild(Col0row)
            tableCol1.current.appendChild(Col1row)
            tableCol2.current.appendChild(Col2row)
            tableCol2.current.appendChild(Col3row)

            console.log(row)
            row++;
   
        });
    }


    return (
        <div className="tableComponent" >

            <div className="tableHeader">
                <div className="tableSearchContainer">
                    <input className="tableSearch"  placeholder="Search for Admins" type="text"></input>
                                       
                </div>
            </div>
            <div className="tableWrapper">
                <div className="tablesContent">
                    
                    <div className="tableCol" id="niTableCol0" ref={tableCol0}>
                        <div className="colHeader"> Number </div>
                    </div>

                    <div className="tableCol" id="niTableCol2" ref={tableCol2}>
                        <div className="colHeader"> Number Type </div>
                    </div>

                    <div className="tableCol" id="niTableCol1" ref={tableCol1}>
                        <div className="colHeader"> Provided By </div>
                    </div>

                    <div className="tableCol" id="niTableCol3" ref={tableCol2}>
                        <div className="colHeader"> Status </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableComponent