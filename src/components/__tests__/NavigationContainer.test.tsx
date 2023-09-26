import { render } from "@testing-library/react";
import { NavigationContainer } from "../NavigationContainer";

describe("<NavigationContainer />", () => {
  test("render NavigationContainer", () => {
    const { container } = render(
      <NavigationContainer>test</NavigationContainer>
    );
    expect(container).toMatchSnapshot();
  });
});
