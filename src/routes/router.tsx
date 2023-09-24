import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { EventsPage } from "./EventsPage";
import { CheckoutPage } from "./CheckoutPage";
import { HomePage } from "./HomePage";
import { ConfirmationPage } from "./ConfirmationPage";
import {
  ConfirmationPending,
  ConfirmationSuccess,
  ConfirmationFailure,
} from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        // this page might be in a completely different app
        // that has increased security requirements
        // and is hosted on a different domain
        // so for this app in real life a browser redirect would be used
        // e.g. with a backend provided token added securely to one of the headers
        // or in the query string
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/confirmation",
        element: <ConfirmationPage />,
        children: [
          {
            path: "/confirmation/pending",
            element: <ConfirmationPending />,
          },
          {
            path: "/confirmation/success",
            element: <ConfirmationSuccess />,
          },
          {
            path: "/confirmation/failure",
            element: <ConfirmationFailure />,
          },
        ],
      },
    ],
  },
]);
