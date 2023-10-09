import { render, fireEvent, getByRole, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { Summary } from "../Summary";
import {
  TicketPurchasingProvider,
  TicketPurchasingContext,
} from "../../contexts";

describe("<Summary />", () => {
  // TODO: write meaningful tests!!!
  let fetchSpy: jest.SpyInstance;
  beforeAll(() => {
    fetchSpy = jest.spyOn(global, "fetch");
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Place Order api call successful", async () => {
    const response = {
      ok: true,
      json: jest.fn().mockResolvedValueOnce([]),
    };
    const promise = Promise.resolve(response);
    fetchSpy.mockReturnValueOnce(promise);

    const value = {
      selectedEvent: {
        name: "Test Event",
        location: "Test Location",
        ISODate: "2021-01-01",
        price: 100,
      },
      ticketsCounter: 1,
      cardInfo: {
        nameOnCard: "Test User",
        cardNumber: "1234123412341234",
        cardType: "Visa",
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
    };
    render(
      <Router>
        <TicketPurchasingContext.Provider value={value}>
          <Summary />
        </TicketPurchasingContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Place Order/i }));
    await act(() => promise);
    // TODO: expect()
  });
  test("Place Order api call failure", async () => {
    const response = {};
    const promise = Promise.reject(response);
    fetchSpy.mockReturnValueOnce(promise);

    const value = {
      selectedEvent: {
        name: "Test Event",
        location: "Test Location",
        ISODate: "2021-01-01",
        price: 100,
      },
      ticketsCounter: 1,
      cardInfo: {
        nameOnCard: "Test User",
        cardNumber: "1234123412341234",
        cardType: "Visa",
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
    };
    render(
      <Router>
        <TicketPurchasingContext.Provider value={value}>
          <Summary />
        </TicketPurchasingContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Place Order/i }));
    await act(() => promise.catch(() => {}));
    // TODO: expect()
  });
  test("Place Order api call returns with error", async () => {
    const response = {};
    const promise = Promise.resolve(response);
    fetchSpy.mockReturnValueOnce(promise);

    const value = {
      selectedEvent: {
        name: "Test Event",
        location: "Test Location",
        ISODate: "2021-01-01",
        price: 100,
      },
      ticketsCounter: 1,
      cardInfo: {
        nameOnCard: "Test User",
        cardNumber: "1234123412341234",
        cardType: "Visa",
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
    };
    render(
      <Router>
        <TicketPurchasingContext.Provider value={value}>
          <Summary />
        </TicketPurchasingContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Place Order/i }));
    // try {
    await act(() => promise);
    // } catch (error) {
    // TODO: expect()
    // }
  });
});
