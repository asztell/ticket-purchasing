import { useAuth0 } from '@auth0/auth0-react'
import { AuthButton, LinkButton } from '.'
import './Header.scss'

export function Header(): JSX.Element {
  const { isAuthenticated } = useAuth0()

  return (
    <div className='Header'>
      <div className='HeaderContainer'>
        <div className='Nav'>
          <LinkButton to='/' label='Home' />
          <LinkButton to='/events' label='Events' />
          <LinkButton to='/profile' label='Profile' show={isAuthenticated} />
        </div>
        <AuthButton />
      </div>
    </div>
  )
}
