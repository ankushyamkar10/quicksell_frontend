import React, { useContext } from "react";
import { priorityLabels, statusLabels } from "../config";
import TicketColumn from "./TicketColumn";
import { AppContext } from "../feature/appContext";

const KanbanBoard = () => {
  const { tickets, grouping, users } = useContext(AppContext);

  const groupedTickets = tickets && Object.groupBy(tickets, (t) => t[grouping]);

  const getColumnHeaders = () => {
    if (grouping === "status") {
      return statusLabels;
    } else if (grouping === "userId") {
      const userMap = {};

      if (users && users.length > 0) {
        users.forEach((user) => {
          userMap[user.id] = user.name;
        });
      }
      return Array.from(
        new Set(Object.keys(groupedTickets).map((userId) => userMap[userId]))
      );
    } else if (grouping === "priority") {
      const priorityLevels = Array.from(
        new Set(
          Object.values(groupedTickets)
            .flat()
            .map((ticket) => ticket.priority)
        )
      );
      return priorityLevels
        .map((level) => priorityLabels[level])
        .filter((label) => label !== undefined);
    }
  };

  const colHeaders = tickets ? getColumnHeaders() : [];

  return (
    <div className="kanban-board">
      <div className="kanban-grid">
        {colHeaders.map((header, index) => {
          const key =
            grouping === "userId"
              ? users.find((user) => user.name === header)?.id
              : grouping === "priority"
              ? index
              : header;

          return (
            <div key={key} className="kanban-column">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div className="ticket-group-header">
                  <img
                    src={
                      grouping === "userId"
                        ? user
                        : grouping === "status"
                        ? statusIcons[index]
                        : priorityIcons[index]
                    }
                    alt="icon"
                  />
                  <span className="column-header">{header}</span>
                  <span className="column-header gray-text">
                    {groupedTickets[key]?.length || 0}
                  </span>
                </div>

                <div className="ticket-group-header">
                  <img src={add} alt="icon" />
                  <img src={menu} alt="icon" />
                </div>
              </div> */}

              <TicketColumn
                tickets={groupedTickets[key]}
                header={header}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
