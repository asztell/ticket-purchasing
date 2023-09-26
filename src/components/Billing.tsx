import { useContext, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { TicketPurchasingContext } from "../contexts";
import "./Billing.scss";

export function Billing({ className }: { className?: string }) {
  const { cardInfo, updateCardInfo } = useContext(TicketPurchasingContext);

  const handleNameOnCardChanges = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateCardInfo({
        ...cardInfo,
        nameOnCard: event.target.value,
      });
    },
    [cardInfo, updateCardInfo]
  );

  const handleCardNumberChanges = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateCardInfo({
        ...cardInfo,
        cardNumber: event.target.value,
      });
    },
    [cardInfo, updateCardInfo]
  );

  const handleExpirationDateChanges = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateCardInfo({
        ...cardInfo,
        expirationDate: event.target.value,
      });
    },
    [cardInfo, updateCardInfo]
  );

  //   const handleCardNumberBlur = useCallback(() => {
  //     // TODO / MAYBE show credit card validation on blur
  //   }, [cardNumber, validateCardNumber]);

  const handleSecurityCodeChanges = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateCardInfo({
        ...cardInfo,
        securityCode: event.target.value,
      });
    },
    [cardInfo, updateCardInfo]
  );

  //   const handleSecurityCodeBlur = useCallback(() => {
  //     // TODO / MAYBE show security code validation on blur
  //   }, [securityCode, validateSecurityCode]);

  return (
    <div className={className}>
      <div className="Delivery">
        <h2 className="Section-Header">
          <FormattedMessage id="Billing.Delivery.Header.Text" />
        </h2>
        <h3>
          <FormattedMessage id="Billing.Delivery.Sub-Header.Text" />
        </h3>
        <p>
          <FormattedMessage id="Billing.Delivery.Description.Text" />
        </p>
      </div>
      <div className="Payment">
        <h2 className="Section-Header">Payment</h2>
        <div data-tid="accepted-cards" className="Accepted-Cards">
          <div aria-label="american-express" role="img" className="Amex"></div>
          <div aria-label="visa" role="img" className="Visa"></div>
          <div
            aria-label="master-card"
            role="img"
            className="Master-Card"
          ></div>
          <div
            // logo="discover"
            aria-label="discover"
            role="img"
            className="Discover"
          ></div>
          <div
            aria-label="diners-club"
            role="img"
            className="Diners-Club"
          ></div>
        </div>
        <div className="Payment-Section">
          <label htmlFor="name-on-card" className="Payment-Form-Label">
            Name on Card
          </label>
          <input
            type="text"
            onChange={handleNameOnCardChanges}
            // onBlur={handleCardNumberBlur}
            value={cardInfo.nameOnCard}
            // style={{ marginBottom: "10px" }}
          />
          {/* <span>{cardInfo.cardType}</span> */}
        </div>
        <div className="Payment-Section">
          <label htmlFor="card-number" className="Payment-Form-Label">
            Card Number
          </label>
          <input
            type="text"
            onChange={handleCardNumberChanges}
            // onBlur={handleCardNumberBlur}
            value={cardInfo.cardNumber}
          />
          <span className="Payment-Validation-Error">{cardInfo.cardType}</span>
        </div>
        <div className="Payment-Section">
          <label className="Payment-Form-Label">Expiration Date</label>
          <input
            type="month"
            onChange={handleExpirationDateChanges}
            // onBlur={handleSecurityCodeBlur}
            value={cardInfo.expirationDate}
            maxLength={8}
          />
          <span>{cardInfo.expirationDateValid}</span>
        </div>
        <div className="Payment-Section">
          <label className="Payment-Form-Label">Security Code</label>
          <input
            type="text"
            onChange={handleSecurityCodeChanges}
            // onBlur={handleSecurityCodeBlur}
            value={cardInfo.securityCode}
            maxLength={3}
          />
          <span>{cardInfo.securityCodeValid}</span>
        </div>
        <div></div>
      </div>
      <div className="Ticket-Insurance">
        <h2 className="Section-Header">Ticket Insurance</h2>
        <p>
          Get reimbursed up to 100% with Event Ticket Insurance for only $28.00
          per ticket ($56.00 total). *Offer not available after purchase is
          finalized.
        </p>
      </div>
    </div>
  );
}
