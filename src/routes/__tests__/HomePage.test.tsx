import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { HomePage } from "../HomePage";

describe("<HomesPage />", () => {
  test("render HomePage", () => {
    const { container } = render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
