import { Billing, Summary, LinkButton } from "../components";
import "./CheckoutPage.scss";

export function CheckoutPage() {
  return (
    <>
      <div className="Checkout-Page">
        <Billing className="Billing" />
        <Summary className="Summary" />
      </div>
      <LinkButton to="/events" label="Back to Events" />
      <LinkButton to="/" label="Home Page" />
    </>
  );
}
