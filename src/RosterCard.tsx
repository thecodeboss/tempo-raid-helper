import { pull } from "lodash";
import { useCallback, useState } from "react";
import { sort } from "./utils";

interface RosterCardProps {
  roster: string[];
  setRoster: (roster: string[]) => void;
}

export const RosterCard = ({ roster, setRoster }: RosterCardProps) => {
  const [error, setError] = useState("");
  const [newRaider, setNewRaider] = useState("");

  const handleNewRaiderChange = useCallback(
    (event) => {
      setNewRaider(event.target.value);
      if (roster.includes(event.target.value)) {
        setError("They're already on the roster!");
      } else {
        setError("");
      }
    },
    [roster, setNewRaider, setError]
  );

  const handleAdd = useCallback(
    (event) => {
      event.preventDefault();
      if (roster.includes(newRaider)) {
        setError("They're already on the roster!");
      } else {
        setRoster(sort([...roster, newRaider]));
        setNewRaider("");
      }
    },
    [newRaider, roster, setNewRaider, setRoster]
  );

  const handleDelete = useCallback(
    (event) => {
      const member: string = event.target.dataset.member;
      setRoster([...pull(roster, member)]);
      if (newRaider === member) {
        setError("");
      }
    },
    [newRaider, roster, setError, setRoster]
  );

  return (
    <div className="card roster-card">
      <h3>Roster</h3>
      <form onSubmit={handleAdd}>
        <span>Add to the roster</span>
        <input value={newRaider} onChange={handleNewRaiderChange} />
        <button type="submit">Add</button>
      </form>
      {error && <span className="error">{error}</span>}
      <div className="mt">
        {roster.length ? (
          <>
            <span>Current roster</span>
            {roster.map((member) => (
              <div key={member}>
                <input defaultValue={member} />
                <button data-member={member} onClick={handleDelete}>
                  Remove
                </button>
              </div>
            ))}
          </>
        ) : (
          "Nobody on the roster yet!"
        )}
      </div>
    </div>
  );
};
