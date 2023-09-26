import { createContext, useCallback, useMemo, useState } from "react";
import { Event } from "./events";

export type CardInfoType = {
  nameOnCard: string;
  cardNumber: string;
  cardType: string;
  securityCode: string | null;
  // TODO: validations could be done on blur
  // and extracted into their own CardValidation type
  securityCodeValid: boolean;
  expirationDate: string;
  expirationDateValid: boolean;
};

export type TicketPurchasingContextType = {
  // TODO: selectedEvent and ticketsCounter could be saved in localStorage
  // this would allow the user to come back to the page and continue
  // it would also allow the user to refresh the page and continue
  // or to save the page as a bookmark and come back to it later or share it
  selectedEvent: Event | undefined;
  ticketsCounter: number;
  cardInfo: CardInfoType;
  termsOfUseChecked: boolean;
  updateSelectedEvent: (selectedEvent: Event) => void;
  updateTicketsCounter: (ticketsCounter: number) => void;
  updateCardInfo: (cardInfo: CardInfoType) => void;
  updateTermsOfUseChecked: (termsOfUseChecked: boolean) => void;
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
  const [termsOfUseChecked, setTermsOfUseChecked] = useState(false);

  const [cardInfo, setCardInfo] = useState<CardInfoType>({
    nameOnCard: "",
    cardNumber: "",
    cardType: "",
    securityCode: null,
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

  const updateTermsOfUseChecked = useCallback((termsOfUseChecked: boolean) => {
    setTermsOfUseChecked(termsOfUseChecked);
  }, []);

  const updateCardInfo = useCallback((cardInfo: CardInfoType) => {
    const { expirationDate, cardNumber, securityCode } = cardInfo;
    const cardType = validateCardNumber(cardNumber);
    const securityCodeValid =
      securityCode !== null &&
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
      termsOfUseChecked,
      updateSelectedEvent,
      updateTicketsCounter,
      updateCardInfo,
      updateTermsOfUseChecked,
    };
  }, [
    selectedEvent,
    ticketsCounter,
    cardInfo,
    termsOfUseChecked,
    updateSelectedEvent,
    updateTicketsCounter,
    updateCardInfo,
    updateTermsOfUseChecked,
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
    expirationDate.match(new RegExp("^([0-9]{4})-(0[1-9]|1[0-2])$")) !== null &&
    new Date(expirationDate) > new Date();
  return expirationDateValid;
}
