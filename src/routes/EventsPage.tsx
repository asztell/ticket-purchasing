import { useContext } from "react";
import {
  Events,
  Quantity,
  LinkButton,
  NavigationContainer,
} from "../components";
import { TicketPurchasingContext } from "../contexts";
import classnames from "classnames";

export function EventsPage() {
  const { selectedEvent, ticketsCounter } = useContext(TicketPurchasingContext);
  const disabledLinkButton = !selectedEvent || ticketsCounter === 0;

  const eventsPageToHomePageClassName = classnames(
    "Events-Page-To-Home-Page",
    "Link-Button",
    "Left-Link-Button"
  );
  const eventsPageToCheckoutPageClassName = classnames(
    "Events-Page-To-Checkout-Page",
    "Link-Button",
    "Right-Link-Button"
  );

  return (
    <div className="Events-Page">
      <div>
        <Events />
        <Quantity />
      </div>
      <NavigationContainer>
        <LinkButton
          to="/"
          label="< Home Page"
          className={eventsPageToHomePageClassName}
        />
        <LinkButton
          to="/checkout"
          disabled={disabledLinkButton}
          label="Next >"
          className={eventsPageToCheckoutPageClassName}
        />
      </NavigationContainer>
    </div>
  );
}
