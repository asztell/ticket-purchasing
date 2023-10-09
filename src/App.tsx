import { Outlet } from "react-router-dom";
import { IntlProvider } from "react-intl";
// import { Auth0Provider } from "@auth0/auth0-react";
import messages from "./lang/en-US.json";
import { TicketPurchasingProvider, EventsProvider } from "./contexts";
import { Header } from "./components";
import "./App.scss";

export function App() {
  const flattenedMessages = flattenMessages(messages);
  console.log(process.env);

  return (
    <IntlProvider locale={navigator.language} messages={flattenedMessages}>
      <EventsProvider>
        <TicketPurchasingProvider>
          {/* <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN!}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
            authorizationParams={{
              // audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              // scope: "openid profile email",
              redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
            }}
          > */}
          <Header />
          <div className="App">
            <div className="App-Content">
              <Outlet />
            </div>
          </div>
          {/* </Auth0Provider> */}
        </TicketPurchasingProvider>
      </EventsProvider>
    </IntlProvider>
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
