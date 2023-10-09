import { createContext, useEffect, useMemo, useState } from "react";

export type Event = {
  id: string;
  name: string;
  location: string;
  ISODate: string;
  price: number;
};

export type EventsContextType = {
  events: Event[];
  error: string | null;
};

export const EventsContext = createContext<EventsContextType>(
  {} as EventsContextType
);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/events`)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((result) => {
        setEvents(result);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setEvents]);

  const value = useMemo(() => {
    return {
      events,
      error,
    };
  }, [events, error]);

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}
