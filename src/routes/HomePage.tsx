import { Redirect } from "../components";

export function HomePage() {
  return (
    <>
      <div>HomePage</div>
      <Redirect to="/events" label="Check out Events" />
    </>
  );
}
