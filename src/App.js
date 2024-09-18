import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import Controls from "./components/Controls";

function App() {
  return (
    <div className="app">
      <Controls />
      <KanbanBoard />
    </div>
  );
}

export default App;
