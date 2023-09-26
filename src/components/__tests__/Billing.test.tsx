import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { flattenMessages } from "../../App";
import { Billing } from "../Billing";
import { TicketPurchasingProvider } from "../../contexts";

describe("<Billing />", () => {
  test("render Billing", () => {
    const { container } = render(
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
        <TicketPurchasingProvider>
          <Billing />
        </TicketPurchasingProvider>
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
