import { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  TicketPurchasingContext,
  TicketPurchasingProvider,
} from "../ticketPurchasing";

describe("TicketPurchasingContext", () => {
  function TestComponent() {
    const {
      selectedEvent,
      ticketsCounter,
      cardInfo,
      termsOfUseChecked,
      updateSelectedEvent,
      updateTicketsCounter,
      updateCardInfo,
      updateTermsOfUseChecked,
    } = useContext(TicketPurchasingContext);
    return (
      <div>
        <div data-testid="selectedEvent">{JSON.stringify(selectedEvent)}</div>
        <div data-testid="ticketsCounter">
          {JSON.stringify([ticketsCounter])}
        </div>
        <div data-testid="cardInfo">{JSON.stringify(cardInfo)}</div>
        <div data-testid="termsOfUseChecked">
          {JSON.stringify(termsOfUseChecked)}
        </div>
        <button
          className="updateSelectedEvent"
          onClick={() => {
            updateSelectedEvent({
              name: "Test Event",
              location: "Test Location",
              ISODate: "2021-01-01",
              price: 100,
            });
          }}
        >
          updateSelectedEvent
        </button>
        <button
          className="updateTicketsCounter"
          onClick={() => {
            updateTicketsCounter(1);
          }}
        >
          updateTicketsCounter
        </button>
        <button
          className="updateCardInfo"
          onClick={() => {
            updateCardInfo({
              cardNumber: "1234123412341234",
              nameOnCard: "Test User",
              cardType: "Test Card",
              securityCode: "123",
              securityCodeValid: true,
              expirationDate: "01/01/2021",
              expirationDateValid: true,
            });
          }}
        >
          updateCardInfo
        </button>
        <button
          className="updateTermsOfUseChecked"
          onClick={() => {
            updateTermsOfUseChecked(true);
          }}
        >
          updateTermsOfUseChecked
        </button>
      </div>
    );
  }
  test("should return initial state", () => {
    render(
      <TicketPurchasingProvider>
        <TestComponent />
      </TicketPurchasingProvider>
    );
    fireEvent.click(screen.getByText("updateSelectedEvent"));
    expect(screen.getByTestId("selectedEvent")).toHaveTextContent(
      JSON.stringify({
        name: "Test Event",
        location: "Test Location",
        ISODate: "2021-01-01",
        price: 100,
      })
    );
    fireEvent.click(screen.getByText("updateTicketsCounter"));
    expect(screen.getByTestId("ticketsCounter")).toHaveTextContent(
      JSON.stringify([1])
    );
    fireEvent.click(screen.getByText("updateCardInfo"));
    expect(screen.getByTestId("cardInfo")).toHaveTextContent(
      JSON.stringify({
        cardNumber: "1234123412341234",
        nameOnCard: "Test User",
        cardType: "Invalid",
        securityCode: "123",
        securityCodeValid: true,
        expirationDate: "01/01/2021",
        expirationDateValid: false,
      })
    );
    fireEvent.click(screen.getByText("updateTermsOfUseChecked"));
    expect(screen.getByTestId("termsOfUseChecked")).toHaveTextContent(
      JSON.stringify(true)
    );
  });
});
