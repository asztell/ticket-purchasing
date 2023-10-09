import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { EventsPage } from "./EventsPage";
import { CheckoutPage } from "./CheckoutPage";
import { HomePage } from "./HomePage";
import { ConfirmationPage } from "./ConfirmationPage";
import { ProfilePage } from "./ProfilePage";

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
      // {
      //   path: "/profile",
      //   element: <ProfilePage />,
      // },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/confirmation",
        element: <ConfirmationPage />,
      },
    ],
  },
]);
