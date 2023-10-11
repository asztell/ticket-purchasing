import { useState, useContext, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { TicketPurchasingContext } from '../contexts'
import './Billing.scss'

export function Billing({ className }: { className?: string }): JSX.Element {
  const [showSecurityCodeValidation, setShowSecurityCodeValidation] =
    useState(false)
  const [showCardNumberValidation, setShowCardNumberValidation] =
    useState(false)

  const { cardInfo, updateCardInfo } = useContext(TicketPurchasingContext)
  const [showExpirationDateValidation, setShowExpirationDateValidation] =
    useState(false)

  const handlePaymentChanges = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (cardInfo !== null) {
        updateCardInfo({
          ...cardInfo,
          [event.target.className]: event.target.value
        })
      }
    },
    [cardInfo, updateCardInfo]
  )

  const handleCardNumberBlur = useCallback(() => {
    setShowCardNumberValidation(true)
  }, [setShowCardNumberValidation])

  function displayValidation(fieldName: string): string | null {
    switch (fieldName) {
      case 'cardNumber':
        if (showCardNumberValidation) {
          return cardInfo?.cardType !== null ? null : ''
        } else {
          return null
        }
      case 'securityCode':
        if (showSecurityCodeValidation) {
          return cardInfo?.securityCodeValid !== null ? null : 'Invalid'
        } else {
          return null
        }
      case 'expirationDate':
        if (showExpirationDateValidation) {
          return cardInfo?.expirationDateValid !== null ? null : 'Invalid'
        } else {
          return null
        }
      default:
        return null
    }
  }

  const handleSecurityCodeBlur = useCallback(() => {
    setShowSecurityCodeValidation(true)
  }, [setShowSecurityCodeValidation])

  const handleExpirationDateBlur = useCallback(() => {
    setShowExpirationDateValidation(true)
  }, [setShowExpirationDateValidation])

  return (
    <div className={className}>
      {/* TODO: each Billing entry can be extracted into its own component */}
      <div className='Delivery'>
        <h2 className='Section-Header'>
          <FormattedMessage id='Billing.Delivery.Header.Text' />
        </h2>
        <h3>
          <FormattedMessage id='Billing.Delivery.Sub-Header.Text' />
        </h3>
        <p>
          <FormattedMessage id='Billing.Delivery.Description.Text' />
        </p>
      </div>
      <div className='Payment'>
        <h2 className='Section-Header'>
          <FormattedMessage id='Billing.Payment.Header.Text' />
        </h2>
        <div data-tid='accepted-cards' className='Accepted-Cards'>
          <div aria-label='american-express' role='img' className='Amex'></div>
          <div aria-label='visa' role='img' className='Visa'></div>
          <div
            aria-label='master-card'
            role='img'
            className='Master-Card'
          ></div>
          <div
            // logo="discover"
            aria-label='discover'
            role='img'
            className='Discover'
          ></div>
          <div
            aria-label='diners-club'
            role='img'
            className='Diners-Club'
          ></div>
        </div>
        {/* TODO: the payment sections can be extracted into a PaymentSection component */}
        <div className='Payment-Section'>
          <label htmlFor='name-on-card' className='Payment-Form-Label'>
            <FormattedMessage id='Billing.Payment.Payment-Section.Name-On-Card.Label' />
          </label>
          <input
            type='text'
            onChange={handlePaymentChanges}
            className='nameOnCard'
            // onBlur={handleCardNumberBlur}
            value={cardInfo?.nameOnCard}
          />
        </div>
        <div className='Payment-Section'>
          <label htmlFor='card-number' className='Payment-Form-Label'>
            <FormattedMessage id='Billing.Payment.Payment-Section.Card-Number.Label' />
          </label>
          <input
            type='text'
            onChange={handlePaymentChanges}
            onBlur={handleCardNumberBlur}
            className='cardNumber'
            value={cardInfo?.cardNumber}
          />
          <div className='Payment-Validation-Error'>{cardInfo?.cardType}</div>
        </div>
        <div className='Payment-Section Expiration-Date-And-Security-Code'>
          <div className='Expiration-Date'>
            <label className='Payment-Form-Label'>
              <FormattedMessage id='Billing.Payment.Payment-Section.Expiration-Date.Label' />
            </label>
            <input
              type='month'
              onChange={handlePaymentChanges}
              onBlur={handleExpirationDateBlur}
              className='expirationDate'
              value={cardInfo?.expirationDate}
              maxLength={8}
            />
            <div>{cardInfo?.expirationDateValid}</div>
          </div>
          <div className='Security-Code'>
            <label className='Payment-Form-Label'>
              <FormattedMessage id='Billing.Payment.Payment-Section.Security-Code.Label' />
            </label>
            <input
              type='text'
              onChange={handlePaymentChanges}
              onBlur={handleSecurityCodeBlur}
              className='securityCode'
              value={
                cardInfo?.securityCode !== null ? cardInfo?.securityCode : ''
              }
              maxLength={3}
            />
            <div>{displayValidation('securityCode')}</div>
          </div>
        </div>
        <div></div>
      </div>
      <div className='Ticket-Insurance'>
        <h2 className='Section-Header'>
          <FormattedMessage id='Billing.Ticket-Insurance.Header.Text' />
        </h2>
        <p>
          <FormattedMessage id='Billing.Ticket-Insurance.Description.Text' />
        </p>
      </div>
    </div>
  )
}
