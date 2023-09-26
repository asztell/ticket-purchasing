import { render } from "@testing-library/react";
import { Quantity } from "../Quantity";

describe("<Quantity />", () => {
  test("render Quantity", () => {
    const { container } = render(<Quantity />);
    expect(container).toMatchSnapshot();
  });
});
