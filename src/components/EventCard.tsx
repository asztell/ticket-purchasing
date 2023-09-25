import { useCallback } from "react";
import { Event } from "../contexts";
import classnames from "classnames";
import "./EventCard.scss";

export function EventCard({
  event,
  selected,
  className,
  onEventChange,
}: {
  event: Event;
  selected?: boolean;
  className?: string;
  onEventChange: (event: Event) => void;
}) {
  console.log(selected);
  const { ISODate, name, price, location } = event;
  const formattedDate = new Date(ISODate).toLocaleDateString();
  const formattedTime = new Date(ISODate).toLocaleTimeString();
  const formattedDayOfWeek = new Date(ISODate).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  const cardClassName = classnames(
    "Event-Card",
    { "Selected-Event-Card": selected },
    className
  );

  const handleEventSelect = useCallback(() => {
    onEventChange(event);
  }, [event, onEventChange]);

  return (
    <div onClick={handleEventSelect} className={cardClassName}>
      <div className="Event-Name">{name}</div>
      <div className="Event-Date">{`${formattedDayOfWeek} • ${formattedDate} • ${formattedTime}`}</div>
      <div className="Event-Location">{location}</div>
      <div className="Event-Price">{`Price: ${formattedPrice}`}</div>
    </div>
  );
}
