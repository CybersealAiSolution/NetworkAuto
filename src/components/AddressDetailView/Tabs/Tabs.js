import React, { useState } from "react";
import "./index.css"; 
import SubnetTable from "./SubnetTable/SubnetTable";
import AccessPointTable from "./AccessPointTable/AccessPointTable";
import SwitchTable from "./SwitchTable/SwitchTable";
import PlaceTable from "./PlacesTable/PlaceTable";

const Tab = ({ label, activeTab, onClick }) => {
  const isActive = activeTab === label;

  return (
    <div
      className={`tab ${isActive ? "active" : ""} navitem`}
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
};

// Tabs components starts from here
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Places");
  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <>
      <div className="tabs-container">
        <div className="tabs-navbar">
          <Tab label="Places" activeTab={activeTab} onClick={handleTabClick} />
          <Tab label="Subnets" activeTab={activeTab} onClick={handleTabClick} />
          <Tab
            label="Access Points"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          <Tab
            label="Switches"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
        </div>

        <div className="tab-content">
          {/* Content for Tab 1 */}
          {activeTab === "Places" && <PlaceTable />}
          {activeTab === "Subnets" && <SubnetTable />}
          {activeTab === "Access Points" && <AccessPointTable />}
          {activeTab === "Switches" && <SwitchTable />}
        </div>
      </div>
    </>
  );
};

export default Tabs;
