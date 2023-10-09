import { LinkButton } from "../components";

export function HomePage() {
  return (
    <div className="Home-Page Page">
      <LinkButton
        to="/events"
        label="Check out Events >>"
        className="Events-Link-Button"
      />
    </div>
  );
}
