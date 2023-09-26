import { Outlet } from "react-router-dom";
import { IntlProvider } from "react-intl";
// import { flatten } from "flat";
import messages from "./lang/en-US.json";
import { TicketPurchasingProvider } from "./contexts/ticketPurchasing";
import { EventsProvider } from "./contexts/events";
import "./App.scss";

export function App() {
  const flattenedMessages = flattenMessages(messages);
  console.log(flattenedMessages);
  return (
    <div className="App">
      <IntlProvider locale={navigator.language} messages={flattenedMessages}>
        <header className="App-Header"></header>
        <EventsProvider>
          <TicketPurchasingProvider>
            <div className="App-Content">
              <Outlet />
            </div>
          </TicketPurchasingProvider>
        </EventsProvider>
      </IntlProvider>
    </div>
  );
}

export const flattenMessages = (
  nestedMessages: Record<string, any>,
  prefix = ""
) => {
  if (nestedMessages === null) {
    return {};
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};
