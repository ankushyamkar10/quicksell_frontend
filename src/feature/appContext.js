import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupOption, setGroupOption] = useState("status");
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const { tickets, users } = await response.json();
      setTickets(tickets);
      setUsers(users);
    };

    fetchTickets();
  }, []);

  const handleGroupOptionChange = (value) => {
    setGroupOption(value);
  };

  const handlesortOptionChange = (value) => {
    setSortOption(value);
  };

  return (
    <AppContext.Provider
      value={{
        tickets,
        users,
        groupOption,
        sortOption,
        handleGroupOptionChange,
        handlesortOptionChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
