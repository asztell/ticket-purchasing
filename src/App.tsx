import { Outlet } from "react-router-dom";
import { TicketPurchasingProvider } from "./contexts/ticketPurchasing";
import { EventsProvider } from "./contexts/events";
import "./App.scss";

export function App() {
  return (
    <div className="App">
      <header className="App-Header"></header>
      <EventsProvider>
        <TicketPurchasingProvider>
          <div className="App-Content">
            <Outlet />
          </div>
        </TicketPurchasingProvider>
      </EventsProvider>
    </div>
  );
}
