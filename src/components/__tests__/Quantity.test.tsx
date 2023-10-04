import { render, fireEvent, screen } from "@testing-library/react";
import { Quantity } from "../Quantity";
// TODO: implement jest.mock("../../contexts");
import { TicketPurchasingContext } from "../../contexts";

describe("<Quantity />", () => {
  test("render Quantity", () => {
    const value = {
      ticketsCounter: 0,
      selectedEvent: {
        name: "",
        location: "",
        ISODate: "",
        price: 0,
      },
      cardInfo: {
        cardNumber: "",
        nameOnCard: "",
        cardType: "",
        securityCode: "",
        securityCodeValid: true,
        expirationDate: "",
        expirationDateValid: true,
      },
      termsOfUseChecked: true,
      updateTicketsCounter: jest.fn((updateBy) => {
        value.ticketsCounter = value.ticketsCounter + updateBy;
      }),
      updateSelectedEvent: () => {},
      updateCardInfo: () => {},
      updateTermsOfUseChecked: () => {},
    };
    const { rerender } = render(
      <TicketPurchasingContext.Provider value={value}>
        <Quantity />
      </TicketPurchasingContext.Provider>
    );
    expect(screen.getByText("0")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    rerender(
      <TicketPurchasingContext.Provider value={value}>
        <Quantity />
      </TicketPurchasingContext.Provider>
    );
    expect(value.updateTicketsCounter).toHaveBeenCalledWith(1);
    expect(value.updateTicketsCounter).toHaveBeenCalledTimes(1);
    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "-" }));
    rerender(
      <TicketPurchasingContext.Provider value={value}>
        <Quantity />
      </TicketPurchasingContext.Provider>
    );
    expect(value.updateTicketsCounter).toHaveBeenCalledWith(-1);
    expect(value.updateTicketsCounter).toHaveBeenCalledTimes(2);
    expect(screen.getByText("0")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "-" }));
    rerender(
      <TicketPurchasingContext.Provider value={value}>
        <Quantity />
      </TicketPurchasingContext.Provider>
    );
    expect(value.updateTicketsCounter).toHaveBeenCalledTimes(2);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
