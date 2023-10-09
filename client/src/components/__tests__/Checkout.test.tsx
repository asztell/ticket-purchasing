import { render } from "@testing-library/react";
import { Checkout } from "../Checkout";

describe("<Checkout />", () => {
  test("render Checkout", () => {
    const { container } = render(<Checkout />);
    expect(container).toMatchSnapshot();
  });
});
