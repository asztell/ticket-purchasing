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
    // const url = `${document.location.origin}/events`;
    const url = `${process.env.REACT_APP_API}/events`;
    console.log("url", url);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((result) => {
        console.log("events", result);
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
