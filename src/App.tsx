import { useEffect, useState } from "react";

import "./styles.css";
import { EventCard } from "./EventCard";
import { RosterCard } from "./RosterCard";

export const App = () => {
  const [roster, setRoster] = useState<string[]>(
    JSON.parse(localStorage.getItem("roster") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("roster", JSON.stringify(roster));
  }, [roster]);

  return (
    <>
      <div className="App">
        <h1>Tempo Raid Helper</h1>
        <div className="main">
          <RosterCard roster={roster} setRoster={setRoster} />
          <EventCard roster={roster} setRoster={setRoster} />
        </div>
      </div>
      <footer>Made by Code &lt;3</footer>
    </>
  );
};
