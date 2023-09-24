import { useContext } from "react";
import { Events, Quantity, Redirect } from "../components";
import { TicketPurchasingContext } from "../contexts";

export function EventsPage() {
  const { selectedEvent, ticketsCounter } = useContext(TicketPurchasingContext);
  const disabledRedirect = selectedEvent === "" || ticketsCounter === 0;

  return (
    <div>
      <Events />
      <Quantity />
      <Redirect
        to="/"
        label="< Home Page"
        className="Events-Page-To-Home-Page"
      />
      <Redirect
        to="/checkout"
        disabled={disabledRedirect}
        label="Next >"
        className="Events-Page-To-Checkout-Page"
      />
    </div>
  );
}
