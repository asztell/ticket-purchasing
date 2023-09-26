import { render } from "@testing-library/react";
import { Billing } from "../Billing";
import { TicketPurchasingProvider } from "../../contexts";

describe("<Billing />", () => {
  test("render Billing", () => {
    const { container } = render(
      <TicketPurchasingProvider>
        <Billing />
      </TicketPurchasingProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
