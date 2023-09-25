import React, { useCallback, useContext } from "react";
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
          return (
            <EventCard
              event={event}
              selected={selectedEvent === event}
              className="Event"
              onEventChange={handleEventChange}
            />
          );
        })}
      </div>
    </div>
  );
}
