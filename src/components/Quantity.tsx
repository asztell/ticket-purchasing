import { useCallback, useContext } from "react";
import { TicketPurchasingContext } from "../contexts";

export function Quantity() {
  const { ticketsCounter, updateTicketsCounter } = useContext(
    TicketPurchasingContext
  );

  const handleDecrement = useCallback(() => {
    if (ticketsCounter > 0) updateTicketsCounter(-1);
  }, [updateTicketsCounter, ticketsCounter]);

  const handleIncrement = useCallback(() => {
    updateTicketsCounter(1);
  }, [updateTicketsCounter]);

  return (
    <div className="Quantity">
      <h2>Quantity</h2>
      <div>
        <button
          id="decrement-btn"
          style={{ marginRight: "10px" }}
          onClick={handleDecrement}
        >
          -
        </button>
        <span id="counter-value">{ticketsCounter}</span>
        <button
          id="increment-btn"
          style={{ marginLeft: "10px" }}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
}
