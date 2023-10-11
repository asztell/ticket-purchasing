import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { Auth0Provider } from '@auth0/auth0-react'
import messages from './lang/en-US.json'
import { TicketPurchasingProvider, EventsProvider } from './contexts'
import { Header } from './components'
import './App.scss'

export function App(): ReactElement {
  const flattenedMessages = flattenMessages(messages)

  const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN as string
  const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string
  const auth0RedirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI as string

  console.log('auth0Domain', auth0Domain)
  console.log('auth0ClientId', auth0ClientId)
  console.log('auth0RedirectUri', auth0RedirectUri)

  return (
    <IntlProvider locale={navigator.language} messages={flattenedMessages}>
      <EventsProvider>
        <TicketPurchasingProvider>
          <Auth0Provider
            domain={auth0Domain}
            clientId={auth0ClientId}
            authorizationParams={{
              // audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              // scope: "openid profile email",
              redirect_uri: auth0RedirectUri
            }}
          >
            <Header />
            <div className='App'>
              <div className='App-Content'>
                <Outlet />
              </div>
            </div>
          </Auth0Provider>
        </TicketPurchasingProvider>
      </EventsProvider>
    </IntlProvider>
  )
}

export const flattenMessages = (
  nestedMessages: Record<string, any>,
  prefix = ''
): Record<string, string> => {
  if (nestedMessages === null) {
    return {}
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key]
    const prefixedKey = prefix !== '' ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      Object.assign(messages, { [prefixedKey]: value })
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}
