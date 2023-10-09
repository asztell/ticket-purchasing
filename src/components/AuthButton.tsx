import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButton.scss";

export function AuthButton() {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const label = isAuthenticated ? "Log Out" : "Log In";

  function onClick() {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  }

  if (isLoading) {
    return null;
  }

  return (
    <button className="AuthButton" onClick={onClick}>
      {label}
    </button>
  );
}
