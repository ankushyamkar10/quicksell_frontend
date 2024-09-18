import React, { useContext, useState } from "react";
import display from "../images/Display.svg";
import down from "../images/down.svg";
import { AppContext } from "../feature/appContext";

const GroupingControls = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { grouping, sortOrder, handleGroupingChange, handleSortOrderChange } =
    useContext(AppContext);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="grouping-controls">
      <div className="display-container">
        <img src={display} alt="display-icon" />
        <span>Display</span>
        <img
          src={down}
          alt="down-icon"
          onClick={handleShowDropdown}
          style={{ cursor: "pointer" }}
        />
      </div>

      {showDropdown && (
        <div className="dropdown-container">
          <div style={{ marginBottom: "10px" }}>
            <div className="dropdown-title">Grouping</div>
            <select
              value={grouping}
              onChange={(e) => {
                handleGroupingChange(e.target.value);
              }}
            >
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>{" "}
          </div>
          <div>
            <div className="dropdown-title">Ordering</div>
            <select
              value={sortOrder}
              onChange={(e) => handleSortOrderChange(e.target.value)}
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
