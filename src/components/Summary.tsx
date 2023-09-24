import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TicketPurchasingContext } from "../contexts";
// import { Redirect } from "./Redirect";

export function Summary() {
  const { selectedEvent, ticketsCounter, cardInfo } = useContext(
    TicketPurchasingContext
  );
  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    console.log("Submitting...");
    // start spinner (loading)

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
        // stop spinner/loading (in case user comes back to this page)
      });

    //   try {
    //     const response = await fetch('/')
    //     const data = await response.json()
    //     const response2 = await fetch('/2', data)
    //     const data2 = await response2.json()
    //   } catch (error) {

    //   }
  }, [selectedEvent, ticketsCounter, cardInfo, navigate]);

  return (
    <div className="Summary">
      <h2>Summary</h2>
      <p>Event: {selectedEvent}</p>
      <p>Tickets: {ticketsCounter}</p>
      <p>Card Number: {cardInfo.cardNumber}</p>
      <p>Security Code: {cardInfo.securityCode}</p>
      {/* <Redirect
        to="/confirmation/pending"
        label="Purchase Tickets"
        disabled={
          cardInfo.cardType === "" ||
          cardInfo.cardType === "Invalid" ||
          !cardInfo.securityCodeValid
        }
        className="Purchase-Tickets"
        onClick={handleSubmit}
      /> */}
      <button
        onClick={handleSubmit}
        disabled={
          cardInfo.cardType === "" ||
          cardInfo.cardType === "Invalid" ||
          !cardInfo.securityCodeValid
        }
      >
        Purchase Tickets
      </button>
    </div>
  );
}
