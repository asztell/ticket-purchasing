import { render } from "@testing-library/react";
import { LinkButton } from "../LinkButton";
import { MemoryRouter as Router } from "react-router-dom";

describe("<LinkButton />", () => {
  test("render LinkButton", () => {
    const { container } = render(
      <Router>
        <LinkButton to="/test" label="Test Label" />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
