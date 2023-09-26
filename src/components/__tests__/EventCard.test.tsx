import { render } from "@testing-library/react";
import { EventCard } from "../EventCard";

describe("<EventCard />", () => {
  test("render EventCard", () => {
    const { container } = render(
      <EventCard
        event={{
          name: "",
          ISODate: "",
          location: "",
          price: 0,
        }}
        onEventChange={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
