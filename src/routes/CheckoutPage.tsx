import { Billing, Summary, Redirect } from "../components";

export function CheckoutPage() {
  return (
    <div>
      <Billing />
      <Summary />
      <Redirect to="/events" label="Back to Events" />
      <Redirect to="/" label="Home Page" />
    </div>
  );
}
