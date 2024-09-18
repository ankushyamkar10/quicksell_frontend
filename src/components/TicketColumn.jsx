import React, { useContext } from "react";
import TicketCard from "./TicketCard";
import { AppContext } from "../feature/appContext";
import add from "../images/add.svg";
import menu from "../images/menu.svg";
import {
  getRandomColor,
  getRandomStatusColor,
  priorityIcons,
  statusIcons,
} from "../config";

const TicketColumn = ({ tickets, header, index }) => {
  const { sortOrder, grouping, users } = useContext(AppContext);

  const sortTickets = () => {
    return tickets?.sort((a, b) => {
      if (sortOrder === "priority") {
        return b.priority - a.priority;
      } else if (sortOrder === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const sortedTickets = tickets ? sortTickets() : [];

  const currUser =
    grouping === "userId" && users.find((user) => user.name === header);

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
          {grouping === "userId" ? (
            <div
              className="assignee-avatar"
              style={{ backgroundColor: getRandomColor() }}
            >
              {currUser?.name[0]}
              <div
                className="assignee-avatar-status"
                style={{ backgroundColor: getRandomStatusColor() }}
              ></div>
            </div>
          ) : (
            <img
              src={
                grouping === "status"
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
          There are no tickets for {header} column.
        </p>
      )}
    </div>
  );
};

export default TicketColumn;
