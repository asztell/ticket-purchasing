import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { flattenMessages } from "../../App";
import { CheckoutPage } from "../CheckoutPage";
import { TicketPurchasingContext } from "../../contexts";

describe("<CheckoutPage />", () => {
  test("render CheckoutPage", () => {
    const { container } = render(
      <Router>
        <IntlProvider
          locale="en"
          messages={flattenMessages({
            // TODO: create a test helper version of the flattenMessages function
            // that adds Test to the beginning of each message
            Billing: {
              Delivery: {
                Header: {
                  Text: "Test Delivery",
                },
                "Sub-Header": {
                  Text: "Test Mobile - Free",
                },
                Description: {
                  Text: "Test Your phone's your ticket. Locate your tickets in your account - or in your app. When you go mobile, your tickets will not be emailed to you or available for print.",
                },
              },
              Payment: {
                Header: {
                  Text: "Test Payment",
                },
                "Payment-Section": {
                  "Name-On-Card": {
                    Label: "Test Name on Card",
                  },
                  "Card-Number": {
                    Label: "Test Card Number",
                  },
                  "Expiration-Date": {
                    Label: "Test Expiration Date",
                  },
                  "Security-Code": {
                    Label: "Test Security Code",
                  },
                },
              },
              "Ticket-Insurance": {
                Header: {
                  Text: "Test Ticket Insurance",
                },
                Description: {
                  Text: "Test Get reimbursed up to 100% with Event Ticket Insurance for only $28.00 per ticket ($56.00 total). *Offer not available after purchase is finalized.",
                },
              },
            },
          })}
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
            <CheckoutPage />
          </TicketPurchasingContext.Provider>
        </IntlProvider>
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
