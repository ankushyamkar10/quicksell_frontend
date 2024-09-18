import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import Controls from "./components/Controls";
import "./index.css";

function App() {
  return (
    <div className="app">
      <Controls />
      <KanbanBoard />
    </div>
  );
}

export default App;
