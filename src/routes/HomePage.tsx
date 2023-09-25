import { LinkButton } from "../components";

export function HomePage() {
  return (
    <div className="Home-Page Page">
      <div>HomePage</div>
      <LinkButton to="/events" label="Check out Events" />
    </div>
  );
}
