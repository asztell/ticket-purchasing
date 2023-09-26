import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { ConfirmationPage } from "../ConfirmationPage";

describe("<ConfirmationPage />", () => {
  test("render ConfirmationPage", () => {
    const { container } = render(
      <Router>
        <ConfirmationPage />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
