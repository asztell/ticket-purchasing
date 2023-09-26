import { useCallback, useContext } from "react";
import { TicketPurchasingContext } from "../contexts";
import "./Quantity.scss";

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
      <div className="Container">
        <button onClick={handleDecrement}>-</button>
        <span className="Value">{ticketsCounter}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}
