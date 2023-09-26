import { render } from "@testing-library/react";
import { Summary } from "../Summary";
import { TicketPurchasingProvider } from "../../contexts";
import { MemoryRouter as Router } from "react-router-dom";

describe("<Summary />", () => {
  test("render Summary", () => {
    const { container } = render(
      <Router>
        <TicketPurchasingProvider>
          <Summary />
        </TicketPurchasingProvider>
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
