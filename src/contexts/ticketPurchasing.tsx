import { createContext, useCallback, useMemo, useState } from "react";
import { Event } from "./events";

export type CardInfoType = {
  nameOnCard: string;
  cardNumber: string;
  cardType: string;
  securityCode: string;
  securityCodeValid: boolean;
  expirationDate: string;
  expirationDateValid: boolean;
};

export type TicketPurchasingContextType = {
  selectedEvent: Event | undefined;
  ticketsCounter: number;
  cardInfo: CardInfoType;
  updateSelectedEvent: (selectedEvent: Event) => void;
  updateTicketsCounter: (ticketsCounter: number) => void;
  updateCardInfo: (cardInfo: CardInfoType) => void;
};

export const TicketPurchasingContext =
  createContext<TicketPurchasingContextType>({} as TicketPurchasingContextType);

export function TicketPurchasingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ticketsCounter, setTicketsCounter] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(
    undefined
  );
  const [cardInfo, setCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    cardType: "",
    securityCode: "",
    securityCodeValid: false,
    expirationDate: "",
    expirationDateValid: false,
  });

  const updateTicketsCounter = useCallback((ticketsCounter: number) => {
    setTicketsCounter(
      (prevTicketsCounter) => prevTicketsCounter + ticketsCounter
    );
  }, []);

  const updateSelectedEvent = useCallback((selectedEvent: Event) => {
    setSelectedEvent(selectedEvent);
  }, []);

  const updateCardInfo = useCallback((cardInfo: CardInfoType) => {
    const { expirationDate, cardNumber, securityCode } = cardInfo;
    const cardType = validateCardNumber(cardNumber);
    const securityCodeValid =
      securityCode.match(new RegExp("^[0-9]{3,4}$")) !== null;
    const expirationDateValid = validateExpirationDate(expirationDate);
    setCardInfo({
      ...cardInfo,
      cardType,
      securityCodeValid,
      expirationDateValid,
    });
  }, []);

  const value = useMemo(() => {
    return {
      selectedEvent,
      ticketsCounter,
      cardInfo,
      updateSelectedEvent,
      updateTicketsCounter,
      updateCardInfo,
    };
  }, [
    selectedEvent,
    ticketsCounter,
    cardInfo,
    updateSelectedEvent,
    updateTicketsCounter,
    updateCardInfo,
  ]);
  return (
    <TicketPurchasingContext.Provider value={value}>
      {children}
    </TicketPurchasingContext.Provider>
  );
}

export function validateCardNumber(cardNumber: string) {
  const visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
  if (cardNumber.match(visa) !== null) return "Visa";
  const mastercard = new RegExp(
    "^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$"
  );
  if (cardNumber.match(mastercard) !== null) return "Mastercard";
  const amex = new RegExp("^3[47][0-9]{13}$");
  if (cardNumber.match(amex)) return "American Express";
  const discover = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");
  if (cardNumber.match(discover)) return "Discover";
  const dinersClub = new RegExp("^3(?:0[0-5]|[68][0-9])[0-9]{11}$");
  if (cardNumber.match(dinersClub)) return "Diners Club";
  if (cardNumber.length === 0) return "";
  return "Invalid";
}

export function validateExpirationDate(expirationDate: string) {
  const expirationDateValid =
    expirationDate.match(
      new RegExp("^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$")
    ) !== null && new Date(expirationDate) > new Date();
  return expirationDateValid;
}
