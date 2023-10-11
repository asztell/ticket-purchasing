import { Outlet } from 'react-router-dom'

export function ConfirmationPage(): JSX.Element {
  return (
    <div className='ConfirmationPage Page'>
      <div>ConfirmationPage</div>
      <Outlet />
    </div>
  )
}
