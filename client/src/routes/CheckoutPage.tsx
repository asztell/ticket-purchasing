import {
  Billing,
  Summary,
  LinkButton,
  NavigationContainer
} from '../components'
import classnames from 'classnames'
import './CheckoutPage.scss'

export function CheckoutPage(): JSX.Element {
  const checkoutToEventsClassName = classnames(
    'Checkout-To-Events',
    'Left-Link-Button'
  )
  const checkoutToHomePageClassName = classnames(
    'Checkout-To-Home-Page',
    'Right-Link-Button'
  )
  return (
    <>
      <div className='Checkout-Page'>
        <Billing className='Billing' />
        <Summary className='Summary' />
      </div>
      <NavigationContainer>
        <LinkButton
          to='/events'
          label='Events'
          className={checkoutToEventsClassName}
        />
        <LinkButton
          to='/'
          label='Home'
          className={checkoutToHomePageClassName}
        />
      </NavigationContainer>
    </>
  )
}
