// src/AppContext.js
import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AppContext = createContext();

// Create Provider Component
export const AppProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sortOrder, setSortOrder] = useState("priority");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const { tickets, users } = await response.json();
      setTickets(tickets);
      setUsers(users);
    };

    fetchData();
  }, []);

  const handleGroupingChange = (value) => {
    setGrouping(value);
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

  return (
    <AppContext.Provider
      value={{
        tickets,
        users,
        grouping,
        sortOrder,
        handleGroupingChange,
        handleSortOrderChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
