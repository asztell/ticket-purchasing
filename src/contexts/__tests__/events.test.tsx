import { useContext } from "react";
import { EventsContext, EventsProvider } from "../events";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("EventsContext", () => {
  let fetchSpy: jest.SpyInstance;
  beforeAll(() => {
    fetchSpy = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function TestComponent() {
    const { events, error } = useContext(EventsContext);
    return (
      <div>
        <div data-testid="events">{JSON.stringify(events)}</div>
        <div data-testid="error">{JSON.stringify(error)}</div>
      </div>
    );
  }
  test("should render events", async () => {
    const responseValue = [
      {
        name: "Event 1",
        location: "Location 1",
        ISODate: "2021-01-01",
        price: 100,
      },
      {
        name: "Event 2",
        location: "Location 2",
        ISODate: "2021-01-02",
        price: 200,
      },
    ];
    const response = {
      ok: true,
      json: jest.fn().mockResolvedValueOnce(responseValue),
    };
    const promise = Promise.resolve(response);
    fetchSpy.mockReturnValueOnce(promise);
    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );
    await act(() => promise);
    expect(screen.getByTestId("events")).toHaveTextContent(
      JSON.stringify(responseValue)
    );
  });
  test("should throw error", async () => {
    const responseValue: [] = [];
    const response = 'Error: "Error message"';
    const promise = Promise.reject(response);
    fetchSpy.mockReturnValueOnce(promise);
    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );
    await act(() => promise.catch(() => {}));
    expect(screen.getByTestId("events")).toHaveTextContent(
      JSON.stringify(responseValue)
    );
  });
});
