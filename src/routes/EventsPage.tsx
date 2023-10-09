import { useContext } from "react";
import classnames from "classnames";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Events,
  Quantity,
  LinkButton,
  NavigationContainer,
} from "../components";
import { useQueryParams, getQueryParams } from "../hooks/useQueryParams";
// import { TicketPurchasingContext } from "../contexts";

export function EventsPage() {
  // const { selectedEvent, ticketsCounter } = useContext(TicketPurchasingContext);
  const [queryParams] = useQueryParams();
  const { eventId, ticketsCount } = getQueryParams(queryParams);
  const disabledLinkButton = !eventId || !ticketsCount;
  const { isAuthenticated } = useAuth0();
  const toCkeckoutPage = isAuthenticated ? "/checkout" : "/login";

  const eventsPageToHomePageClassName = classnames(
    "Events-Page-To-Home-Page",
    "Left-Link-Button"
  );
  const eventsPageToCheckoutPageClassName = classnames(
    "Events-Page-To-Checkout-Page",
    "Right-Link-Button"
  );

  return (
    <div className="Events-Page">
      <div>
        <Events />
        <Quantity />
      </div>
      {/* <NavigationContainer>
        <LinkButton
          to="/"
          label="< Home Page"
          className={eventsPageToHomePageClassName}
        />
        <LinkButton
          // to="/checkout"
          to={toCkeckoutPage}
          disabled={disabledLinkButton}
          label="Next >"
          className={eventsPageToCheckoutPageClassName}
        />
      </NavigationContainer> */}
    </div>
  );
}
