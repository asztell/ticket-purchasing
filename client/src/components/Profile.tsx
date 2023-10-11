import { useAuth0 } from '@auth0/auth0-react'

export function Profile(): JSX.Element {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>
  }

  return (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  )
}
