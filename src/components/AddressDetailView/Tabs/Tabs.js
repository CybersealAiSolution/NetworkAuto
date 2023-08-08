import React, { useState } from "react";
import "./index.css"; // Create a CSS file for styling if needed

const Tab = ({ label, activeTab, onClick }) => {
  const isActive = activeTab === label;

  return (
    <div
      className={`tab ${isActive ? "active" : ""}`}
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Tab 1"); // Set the initial active tab

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="tabs-container">
      <Tab label="Tab 1" activeTab={activeTab} onClick={handleTabClick} />
      <Tab label="Tab 2" activeTab={activeTab} onClick={handleTabClick} />
      <Tab label="Tab 3" activeTab={activeTab} onClick={handleTabClick} />
      {/* Add more tabs as needed */}
      <div className="tab-content">
        {/* Content for Tab 1 */}
        {activeTab === "Tab 1" && <p>Content for Tab 1</p>}
        {/* Content for Tab 2 */}
        {activeTab === "Tab 2" && <p>Content for Tab 2</p>}
        {/* Content for Tab 3 */}
        {activeTab === "Tab 3" && <p>Content for Tab 3</p>}
        {/* Add more tab content as needed */}
      </div>
    </div>
  );
};

export default Tabs;
