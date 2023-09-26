import { render } from "@testing-library/react";
import { App } from "./App";

describe("<App />", () => {
  test("render App", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
