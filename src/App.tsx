import { Outlet } from "react-router-dom";
import { TicketPurchasingProvider } from "./contexts/ticketPurchasing";
import { EventsProvider } from "./contexts/events";
import "./App.css";

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ticket Purchasing App</h1>
      </header>
      <EventsProvider>
        <TicketPurchasingProvider>
          <Outlet />
        </TicketPurchasingProvider>
      </EventsProvider>
    </div>
  );
}
