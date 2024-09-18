import React, { useContext } from "react";
import { priorityLabels, statusLabels } from "../config";
import TicketColumn from "./TicketColumn";
import { AppContext } from "../feature/appContext";

const KanbanBoard = () => {
  const { tickets, groupOption, users } = useContext(AppContext);

  const groupedTickets = tickets && Object.groupBy(tickets, (t) => t[groupOption]);

  const getColumnHeaders = () => {
    if (groupOption === "status") {
      return statusLabels;
    } else if (groupOption === "userId") {
      const userMap = users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});
      return Array.from(
        new Set(Object.keys(groupedTickets).map((userId) => userMap[userId]))
      );
    } else if (groupOption === "priority") {
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
    return [];
  };

  const colHeaders = tickets ? getColumnHeaders() : [];

  return (
    <div className="kanban-board">
      <div className="kanban-grid">
        {colHeaders.map((header, index) => {
          const key =
            groupOption === "userId"
              ? users.find((user) => user.name === header)?.id
              : groupOption === "priority"
              ? index
              : header;

          return (
            <div key={key} className="kanban-column">
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
