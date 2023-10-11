import { useAuth0 } from '@auth0/auth0-react'
import './AuthButton.scss'

export function AuthButton(): JSX.Element | null {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0()
  const label = isAuthenticated ? 'Log Out' : 'Log In'

  async function onClick(): Promise<void> {
    if (!isAuthenticated) {
      try {
        await loginWithRedirect()
      } catch (e) {
        console.log(e)
      }
    } else {
      await logout({ logoutParams: { returnTo: window.location.origin } })
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <button className='AuthButton' onClick={onClick}>
      {label}
    </button>
  )
}
