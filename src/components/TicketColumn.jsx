import React, { useContext } from "react";
import TicketCard from "./TicketCard";
import { AppContext } from "../feature/appContext";
import add from "../images/add.svg";
import menu from "../images/menu.svg";
import {
  getUserBgColor,
  priorityIcons,
  statusIcons,
} from "../config";

const TicketColumn = ({ tickets, header, index }) => {
  const { sortOption, groupOption, users } = useContext(AppContext);

  const sortTickets = () => {
    return tickets?.sort((a, b) => {
      if (sortOption === "priority") {
        return b.priority - a.priority;
      } else if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const sortedTickets = tickets ? sortTickets() : [];

  const currUser =
    groupOption === "userId" && users.find((user) => user.name === header);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div className="ticket-group-header">
          {groupOption === "userId" ? (
            <div
              className="assignee-avatar"
              style={{ backgroundColor: getUserBgColor() }}
            >
              {currUser?.name[0]}
              <div
                className="assignee-avatar-status"
                style={{
                  backgroundColor: currUser.available ? "green" : "grey",
                }}
              ></div>
            </div>
          ) : (
            <img
              src={
                groupOption === "status"
                  ? statusIcons[index]
                  : priorityIcons[index]
              }
              alt="icon"
            />
          )}
          <span className="column-header">{header}</span>
          <span className="column-header gray-text">
            {sortedTickets.length || 0}
          </span>
        </div>

        <div className="ticket-group-header">
          <img src={add} alt="icon" />
          <img src={menu} alt="icon" />
        </div>
      </div>

      {sortedTickets.length > 0 ? (
        sortedTickets?.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))
      ) : (
        <p className="empty-ticket ticket-card">
          There are no tickets in this group.
        </p>
      )}
    </div>
  );
};

export default TicketColumn;
