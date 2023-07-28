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
            const response = await axios.get('http://localhost:5000/tenants/Users/64be22c21a41003a4179df42');
            setData(response.data);
            
        } catch (error) {
            setError(error);
        }
    };
    
    fetchData();
    }, []);


    if(data){
        
        tableCol0.current.innerHTML = '';
        tableCol1.current.innerHTML = '';
        tableCol2.current.innerHTML = '';

        const Col0header = document.createElement('div');
        Col0header.className =  "colHeader"
        Col0header.textContent = "user"
        const Col1header = document.createElement('div');
        Col1header.className =  "colHeader"
        Col1header.textContent = "Access Level"
        const Col2header = document.createElement('div');
        Col2header.className =  "colHeader"
        Col2header.textContent = "Delegation"

        tableCol0.current.appendChild(Col0header)
        tableCol1.current.appendChild(Col1header)
        tableCol2.current.appendChild(Col2header)
        


        var row = 0;

        data.user_list.forEach(user => {

            const Col0row = document.createElement('div');
            Col0row.className =  "row"
            Col0row.textContent = user.userName
            const Col1row = document.createElement('div');
            Col1row.className =  "row"
            Col1row.textContent = user.roles
            const Col2row = document.createElement('div');
            Col2row.className =  "row"

            console.log(tableCol0.current.className)
            // <div className="row" id={`row${row}`}>row1</div>
            tableCol0.current.appendChild(Col0row)
            tableCol1.current.appendChild(Col1row)
            tableCol2.current.appendChild(Col2row)
                
            row++;
   
        });
    }


    return (
        <div className="tableComponent" >

            <div className="tableHeader">
                <div className="tableSearchContainer" >
                    <input className="tableSearch"  placeHolder="Search for Admins" type="text"></input>
                                       
                </div>
            </div>
            <div className="tableWrapper">
                <div className="tablesContent">
                    
                    <div className="tableCol" id="AdmintableCol0" ref={tableCol0}>
                        <div className="colHeader"> User Name </div>
                    </div>

                    <div className="tableCol" id="AdmintableCol1" ref={tableCol1}>
                        <div className="colHeader"> Access Level </div>
                    </div>

                    <div className="tableCol" id="AdmintableCol2" ref={tableCol2}>
                        <div className="colHeader"> Delegation </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TableComponent