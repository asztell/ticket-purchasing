import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TicketPurchasingContext } from "../contexts";
import "./Summary.scss";

export function Summary({ className }: { className?: string }) {
  const { selectedEvent, ticketsCounter, cardInfo } = useContext(
    TicketPurchasingContext
  );
  const navigate = useNavigate();
  const handleSubmit = useCallback(() => {
    console.log("Submitting...");
    // TODO: start spinner (loading)

    // TODO: if time permits refactor to try/catch with async/await
    fetch("http://localhost:8080/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: selectedEvent,
        tickets: ticketsCounter,
        cardNumber: cardInfo.cardNumber,
        securityCode: cardInfo.securityCode,
      }),
    })
      .then((response) => {
        console.log("/checkout response", response);
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((response) => {
        navigate("/confirmation/success", { state: response });
      })
      .catch((error) => {
        navigate("/confirmation/error", { state: error });
        console.log(error);
      })
      .finally(() => {
        // TODO: stop spinner/loading (in case user comes back to this page)
      });
  }, [selectedEvent, ticketsCounter, cardInfo, navigate]);

  return (
    <div className={className}>
      <div className="Total">
        <h2>Total</h2>
        <p>Event: {selectedEvent?.name}</p>
        <p>Tickets: {ticketsCounter}</p>
        <p>Card Number: {cardInfo.cardNumber}</p>
        <p>Security Code: {cardInfo.securityCode}</p>
        <input type="checkbox" name="termsOfUse" />
        <label htmlFor="termsOfUse">
          I have read and agree to the current <a href="#">Terms of Use</a>
        </label>
        <button
          className="Purchase-Tickets-Button"
          onClick={handleSubmit}
          disabled={
            cardInfo.cardType === "" ||
            cardInfo.cardType === "Invalid" ||
            !cardInfo.securityCodeValid
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
