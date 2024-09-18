import React, { useContext } from "react";
import { getUserBgColor, labelToIcons, priorityIcons } from "../config";
import { AppContext } from "../feature/appContext";

const TicketCard = ({ ticket }) => {
  const { groupOption, users } = useContext(AppContext);
  const { id, title = "", tag = [], userId, status, priority } = ticket || {};
  
  const user = users?.find((user) => user.id === userId);
  const truncatedTitle = title.length > 50 ? `${title.substr(0, 51)}...` : title;

  return (
    <div className="feature-card">
      <div className="feature-card-header">
        <div style={{ flex: 1 }}>
          <h3 className="feature-id">{id}</h3>
          <h4 className={`feature-title ${groupOption !== "status" && "dficjc"}`}>
            {groupOption !== "status" && status && (
              <img
                src={labelToIcons[status]}
                alt="status-icon"
                style={{ marginRight: "8px" }}
              />
            )}
            {truncatedTitle}
          </h4>
        </div>
        {groupOption !== "userId" && user && (
          <div
            className="assignee-avatar"
            style={{ backgroundColor: getUserBgColor() }}
          >
            {user.name[0]}
            <div
              className="assignee-avatar-status"
              style={{ backgroundColor: user.available ? "green" : "grey" }}
            />
          </div>
        )}
      </div>
      <div className="feature-footer">
        {groupOption !== "priority" && (
          <span className="ellipsis">
            <img src={priorityIcons[priority]} alt="priority-icon" />
          </span>
        )}
        {tag.map((t, index) => (
          <span key={index} className="feature-tag">
            <div></div> {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;
