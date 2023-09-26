import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { EventsPage } from "../EventsPage";
import { TicketPurchasingContext, EventsContext } from "../../contexts";

describe("<EventsPage />", () => {
  test("render EventsPage", () => {
    const { container } = render(
      <Router>
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
            <EventsPage />
          </TicketPurchasingContext.Provider>
        </EventsContext.Provider>
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
