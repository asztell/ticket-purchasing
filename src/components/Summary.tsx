import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TicketPurchasingContext } from "../contexts";
import "./Summary.scss";

export function Summary({ className }: { className?: string }) {
  const {
    selectedEvent,
    ticketsCounter,
    cardInfo,
    termsOfUseChecked,
    updateTermsOfUseChecked,
  } = useContext(TicketPurchasingContext);
  const {
    cardType,
    securityCodeValid,
    expirationDateValid,
    cardNumber,
    securityCode,
  } = cardInfo;

  const handleChangeTermsOfUse = useCallback(() => {
    updateTermsOfUseChecked(!termsOfUseChecked);
  }, [termsOfUseChecked, updateTermsOfUseChecked]);

  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    console.log("Submitting...");
    // TODO: start spinner (loading)
    try {
      // const url = `${document.location.origin}/checkout`;
      const url = `${process.env.REACT_APP_API}/checkout`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: selectedEvent,
          tickets: ticketsCounter,
          cardNumber: cardNumber,
          securityCode: securityCode,
        }),
      });
      console.log("/checkout response", response);
      if (!response.ok) {
        throw response;
      }
      const json = await response.json();
      navigate("/confirmation", { state: json });
    } catch (error) {
      navigate("/confirmation", { state: error });
      console.log(error);
    }
    // TODO: stop spinner/loading (in case user comes back to this page)
  }, [selectedEvent, ticketsCounter, navigate, cardNumber, securityCode]);

  return (
    <div className={className}>
      <div className="Total">
        <h2>Total</h2>
        <p>Event: {selectedEvent?.name}</p>
        <p>Tickets: {ticketsCounter}</p>
        <p>Card Number: {cardNumber}</p>
        <p>Security Code: {securityCode}</p>
        <input
          type="checkbox"
          onChange={handleChangeTermsOfUse}
          checked={termsOfUseChecked}
          name="termsOfUse"
        />
        <label htmlFor="termsOfUse">
          I have read and agree to the current{" "}
          <a href="https://google.com">Terms of Use</a>
        </label>
        <button
          className="Purchase-Tickets-Button"
          onClick={handleSubmit}
          disabled={
            cardType === "" ||
            cardType === "Invalid" ||
            !securityCodeValid ||
            !expirationDateValid ||
            !termsOfUseChecked ||
            ticketsCounter === 0
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
