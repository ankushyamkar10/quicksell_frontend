import React, { useContext } from "react";
import { getRandomColor, getRandomStatusColor, labelToIcons, priorityIcons } from "../config";
import { AppContext } from "../feature/appContext";


const TicketCard = ({ ticket }) => {
  const { grouping, users } = useContext(AppContext);
  const id = ticket?.id;
  const title = ticket?.title;
  const tag = ticket?.tag;
  const user = users?.find((user) => user.id === ticket?.userId);

  return (
    <div className="feature-card">
      <div className="feature-card-header">
        <div style={{ flex: 1 }}>
          <h3 className="feature-id">{id}</h3>
          <h4 className={`feature-title ${grouping !== "status" && "dficjc"}`}>
            {grouping !== "status" && (
              <img
                src={labelToIcons[ticket?.status]}
                alt="status"
                style={{ marginRight: "8px" }}
              />
            )}{" "}
            {title?.length > 50 ? title?.substr(0, 51) + "..." : title}
          </h4>
        </div>
        {grouping !== "userId" && (
          <div
            className="assignee-avatar"
            style={{ backgroundColor: getRandomColor() }}
          >
            {user?.name[0]}
            <div
              className="assignee-avatar-status"
              style={{ backgroundColor: getRandomStatusColor() }}
            ></div>
          </div>
        )}
      </div>
      <div className="feature-footer">
        {grouping !== "priority" && <span className="ellipsis"><img src={priorityIcons[ticket.priority]} alt="priority-icon" /></span>}
        {tag?.map((t, index) => (
          <span key={index} className="feature-tag">
            {" "}
            <div></div> {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;
