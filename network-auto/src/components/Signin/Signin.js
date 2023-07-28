import React from "react";
import "./index.css";

const Signin = () => (
  <>
    <div className="mainDiv">
      <div className="subDiv1">
        <h1>Network Automation System</h1>
        <button className="siginbtn">
          <div>
            <img
              className="msimg"
              src="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
              alt="Microsoft Logo"
            />
          </div>
          <div className="signinText"> Sign in with Microsoft </div>
        </button>
      </div>
      <div className="subDiv2"><div>
            <img
              className="softelimg"
              src="/softel-communications-logo-small.png"
              alt="Microsoft Logo"
            />
          </div></div>
    </div>
  </>
);

export default Signin;
