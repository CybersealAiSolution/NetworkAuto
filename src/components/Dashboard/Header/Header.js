import React from 'react'
import './index.css';

const Header = () => {
    return (
        <div className="headerComponent">

            <div className="organizationName"> <h3><b>Organization Name</b></h3></div>
            <div className="CurrentUserContainer">
                <div className="currentUserProfile"></div>
                <div className="currentUserDetail">
                    User name
                    <div>useremail@cybersealau.com</div>
                    <button className="logout-option">Logout</button>
                </div> 
            </div>
       
        </div>
    )
}

export default Header