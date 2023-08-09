import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const ModalSidebar = () => {
  const [show, setShow] = useState(false);
  const sidebarRef = useRef(null);

  const SidebarContent = () => {
    return (
      <>
        <div className="sidebaradmin" ref={sidebarRef} style={sidebarStyle}>
          <div className="adminform">
            <div className="addadmintag">
              <span>Add Admin</span>
              <span className="cross" onClick={() => setShow(false)}>
                &#10005;
              </span>
            </div>

            <div className="selectradiotag">
              <div class="adminname">
                <label for="exampleInputEmail1" class="form-label">
                  Admin
                </label>
                <input
                  type="text"
                  class="form-select"
                  id="exampleInputEmail1"
                  
                />
                
              </div>
              <h2 className="selectradio">select access level</h2>

              <div className="radiotag">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    read only
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                  />
                  <label class="form-check-label" for="exampleRadios2">
                    read & write
                  </label>
                </div>
                <div class="form-check disabled">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios3"
                    value="option3"
                  />
                  <label class="form-check-label" for="exampleRadios3">
                    full access
                  </label>
                </div>
              </div>
            </div>
            <div className="delegations">
              <h2 className="fame">country delegations</h2>
              <select class="form-select" aria-label="Default select example">
                <option selected>Add Countries</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="delegations">
              <h2 className="fame">department delegations</h2>
              <select class="form-select" aria-label="Default select example">
                <option selected>Add departments</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="foot">
            <button className="footy footy1">Cancel</button>
            <button className="footy footy2">Apply</button>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <>
      <button className="Button" onClick={() => setShow(!show)}>+ Add admin</button>
      {show && <SidebarContent />}
    </>
  );
};
const sidebarStyle = {
  position: "fixed",
  top: "0%",
  right: "0%",
  width: "488px",
  height: "100%",
  backgroundColor: "#fff",
  padding: "20px",
  zIndex: 1000,

  transition: "transform 3s ease-out",
  transform: "translateX(0%)",
};

export default ModalSidebar;
