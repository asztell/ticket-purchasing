import { createContext, useEffect, useMemo, useState } from 'react'

export type Event = {
  id: string
  name: string
  location: string
  ISODate: string
  price: number
}

export type EventsContextType = {
  events: Event[]
  error: string | null
}

export const EventsContext = createContext<EventsContextType>({
  events: [],
  error: null
})

export function EventsProvider({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  const [events, setEvents] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = `${process.env.REACT_APP_API}/events`
    console.log('url', url)
    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          console.error(res)
          throw new Error('Could not fetch events')
        }
        return await res.json()
      })
      .then((result) => {
        console.log('events', result)
        setEvents(result)
      })
      .catch((error) => {
        console.error(error)
        setError(error)
      })
  }, [setEvents])

  const value = useMemo(() => {
    return {
      events,
      error
    }
  }, [events, error])

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  )
}
