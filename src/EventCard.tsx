import { difference } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Event, getEvent, sort } from "./utils";

interface EventCardProps {
  roster: string[];
  setRoster: (roster: string[]) => void;
}

export const EventCard = ({ roster, setRoster }: EventCardProps) => {
  const [eventId, setEventId] = useState(localStorage.getItem("eventId") || "");
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("eventId", eventId);
    if (eventId) {
      (async () => {
        setLoading(true);
        const event = await getEvent(eventId);
        setEvent(event.signups ? event : null);
        setLoading(false);
      })();
    } else {
      setEvent(null);
    }
  }, [eventId, setEvent, setLoading]);

  const handleEventIdChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setEventId(event.target.value);
    },
    [setEventId]
  );

  const signups = useMemo(
    () => sort(event?.signups?.map((signup) => signup.name) || []),
    [event]
  );

  const notSignedUp = useMemo(
    () => difference(roster, signups),
    [signups, roster]
  );

  const notInRoster = useMemo(
    () => difference(signups, roster),
    [signups, roster]
  );

  const addAllToRoster = useCallback(() => {
    setRoster(sort([...roster, ...notInRoster]));
  }, [notInRoster, roster, setRoster]);

  return (
    <div className="card event-card">
      <h3>Event</h3>
      <div>
        <span>Raid-Helper Event ID</span>
        <input
          className="event-id"
          value={eventId}
          onChange={handleEventIdChange}
        />
      </div>
      {loading ? (
        <div className="mt">Loading raid info...</div>
      ) : event ? (
        <>
          <div className="mt">
            <h3>Not Signed Up</h3>
            {notSignedUp.join(", ")}
          </div>
          <div className="mt">
            <h3>Signups</h3>
            {signups.join(", ")}
          </div>
          {notInRoster.length ? (
            <div className="mt">
              <h3>Not In Roster</h3>
              <button className="block" onClick={addAllToRoster}>
                Add all names to roster
              </button>
              <div className="mt">{notInRoster.join(", ")}</div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="mt">Input a valid event ID to see signups</div>
      )}
    </div>
  );
};
