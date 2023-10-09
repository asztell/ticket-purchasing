import { render } from "@testing-library/react";
import { Events } from "../Events";
import { TicketPurchasingContext, EventsContext } from "../../contexts";

describe("<Events />", () => {
  test("render Events", () => {
    const { container } = render(
      <EventsContext.Provider
        value={{
          events: [
            {
              name: "Test Event",
              location: "Test Location",
              ISODate: "2021-01-01",
              price: 100,
            },
          ],
          error: "",
        }}
      >
        <TicketPurchasingContext.Provider
          value={{
            selectedEvent: {
              name: "Test Event",
              location: "Test Location",
              ISODate: "2021-01-01",
              price: 100,
            },
            ticketsCounter: 1,
            cardInfo: {
              cardNumber: "1234123412341234",
              nameOnCard: "Test User",
              cardType: "Test Card",
              securityCode: "123",
              securityCodeValid: true,
              expirationDate: "01/01/2021",
              expirationDateValid: true,
            },
            termsOfUseChecked: true,
            updateSelectedEvent: () => {},
            updateTicketsCounter: () => {},
            updateCardInfo: () => {},
            updateTermsOfUseChecked: () => {},
          }}
        >
          <Events />
        </TicketPurchasingContext.Provider>
      </EventsContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
