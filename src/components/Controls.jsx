import React, { useContext, useState } from "react";
import display from "../images/Display.svg";
import down from "../images/down.svg";
import { AppContext } from "../feature/appContext";

const GroupingControls = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { groupOption, sortOption, handleGroupOptionChange, handlesortOptionChange } =
    useContext(AppContext);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="groupOption-controls">
      <div className="display-container" onClick={toggleDropdown}>
        <img src={display} alt="display-icon" />
        <span>Display</span>
        <img src={down} alt="toggle-dropdown" className="dropdown-toggle-icon" />
      </div>

      {showDropdown && (
        <div className="dropdown-container">
          <div className="dropdown-grouping">
            <label htmlFor="grouping" className="dropdown-title">Grouping</label>
            <select
              id="grouping"
              value={groupOption}
              onChange={(e) => handleGroupOptionChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="dropdown-ordering">
            <label htmlFor="ordering" className="dropdown-title">Ordering</label>
            <select
              id="ordering"
              value={sortOption}
              onChange={(e) => handlesortOptionChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupingControls;
