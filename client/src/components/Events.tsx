import { useCallback, useContext } from "react";
import { EventsContext } from "../contexts";
import { Event } from "../contexts";
import { EventCard } from "./EventCard";
import { useQueryParams, getQueryParams } from "../hooks/useQueryParams";
import "./Events.scss";

export function Events() {
  const { events, error } = useContext(EventsContext);
  const [queryParams, setQueryParams] = useQueryParams();
  const { eventId } = getQueryParams(queryParams);
  console.log("Events", events);

  const handleEventChange = useCallback(
    (event: Event) => {
      setQueryParams(
        (searchParams: URLSearchParams) => {
          searchParams.set("eventId", event.id);
          return searchParams;
        },
        { replace: true }
      );
    },
    [setQueryParams]
  );

  return (
    <div className="Events">
      <h2>Events</h2>
      {error && <div>{error}</div>}
      <div>
        <label htmlFor="event-select">Choose an event:</label>
        {events.map((event: Event) => {
          return (
            <EventCard
              key={event.name}
              event={event}
              selected={eventId === event.id}
              className="Event"
              onEventChange={handleEventChange}
            />
          );
        })}
      </div>
    </div>
  );
}
