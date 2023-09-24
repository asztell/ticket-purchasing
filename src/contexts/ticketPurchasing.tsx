import { createContext, useCallback, useMemo, useState } from "react";

export type CardInfoType = {
  cardNumber: string;
  cardType: string;
  securityCode: string;
  securityCodeValid: boolean;
};

export type TicketPurchasingContextType = {
  selectedEvent: string;
  ticketsCounter: number;
  cardInfo: CardInfoType;
  updateSelectedEvent: (selectedEvent: string) => void;
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
  const [selectedEvent, setSelectedEvent] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardType: "",
    securityCode: "",
    securityCodeValid: false,
  });

  const updateTicketsCounter = useCallback((ticketsCounter: number) => {
    setTicketsCounter(
      (prevTicketsCounter) => prevTicketsCounter + ticketsCounter
    );
  }, []);

  const updateSelectedEvent = useCallback((selectedEvent: string) => {
    setSelectedEvent(selectedEvent);
  }, []);

  const updateCardInfo = useCallback((cardInfo: CardInfoType) => {
    const { cardNumber, securityCode } = cardInfo;
    const cardType = validateCardNumber(cardNumber);
    const securityCodeValid =
      securityCode.match(new RegExp("^[0-9]{3,4}$")) !== null;
    setCardInfo({ ...cardInfo, cardType, securityCodeValid });
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
  if (cardNumber.length === 0) return "";
  return "Invalid";
}
