import {
  Billing,
  Summary,
  LinkButton,
  NavigationContainer,
} from "../components";
import classnames from "classnames";
import "./CheckoutPage.scss";

export function CheckoutPage() {
  const checkoutToEventsClassName = classnames(
    "Checkout-To-Events",
    "Link-Button",
    "Left-Link-Button"
  );
  const checkoutToHomePageClassName = classnames(
    "Checkout-To-Home-Page",
    "Link-Button",
    "Right-Link-Button"
  );
  return (
    <>
      <div className="Checkout-Page">
        <Billing className="Billing" />
        <Summary className="Summary" />
      </div>
      <NavigationContainer>
        <LinkButton
          to="/events"
          label="Back to Events"
          className={checkoutToEventsClassName}
        />
        <LinkButton
          to="/"
          label="Home Page"
          className={checkoutToHomePageClassName}
        />
      </NavigationContainer>
    </>
  );
}
