import { useCallback, useContext } from "react";
import { EventsContext, TicketPurchasingContext } from "../contexts";
import { Event } from "../contexts";
import { EventCard } from "./EventCard";
import "./Events.scss";

export function Events() {
  const { selectedEvent, updateSelectedEvent } = useContext(
    TicketPurchasingContext
  );
  const { events, error } = useContext(EventsContext);

  const handleEventChange = useCallback(
    (event: Event) => {
      console.log("handleEventChange event", event);
      updateSelectedEvent(event);
    },
    [updateSelectedEvent]
  );
  return (
    <div className="Events">
      <h2>Events</h2>
      {error && <div>{error}</div>}
      <div>
        <label htmlFor="event-select">Choose an event:</label>
        {events.map((event: Event) => {
          // console.log(selectedEvent);
          // console.log(event);
          console.log("selectedEvent === event", selectedEvent === event);
          return (
            <EventCard
              key={event.name}
              event={event}
              // selected={selectedEvent === event}
              selected={JSON.stringify(selectedEvent) === JSON.stringify(event)}
              className="Event"
              onEventChange={handleEventChange}
            />
          );
        })}
      </div>
    </div>
  );
}
