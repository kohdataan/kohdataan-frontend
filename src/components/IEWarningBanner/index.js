import React, { useState } from 'react'
import CookieConsent from 'react-cookie-consent'
import ModalContainer from '../ModalContainer'
import ButtonContainer from '../ButtonContainer'
import PrivacyPolicy from '../PrivacyPolicy'
import './styles.scss'

const IEWarningBanner = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [ieModalIsOpen, setIeModalIsOpen] = useState(false)

  const acceptIeBad = () => {
    setModalIsOpen(false)
  }

  return (
    <ModalContainer
      label="ie-banner-modal"
      modalIsOpen={modalIsOpen}
      closeModal={() => {}}
      cookie
    >
      <div className="ie-info-container">
        <CookieConsent
          buttonText="Hyväksy"
          onAccept={acceptIeBad}
          cookieName="IEBadAcknowledged"
          style={{
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            padding: '5px',
            position: 'absolute',
            top: '2%',
          }}
          buttonStyle={{
            color: '#3a3a3a',
            fontSize: '0.900rem',
            background: '#f59023',
            margin: '0 auto 10px',
            padding: '5px 10px',
            borderRadius: '30px',
            flex: '0 auto',
          }}
          contentStyle={{
            flex: '0 auto',
            margin: '15px',
          }}
        >
          Palvelu ei valitettavasti toimi kunnolla Microsoft Internet Explorer
          -selaimella. Microsoft ei enää tue ja kehitä sitä. Suosittelemme
          käyttämään jotain muuta selainta.
        </CookieConsent>
        <ModalContainer
          modalIsOpen={ieModalIsOpen}
          closeModal={() => setIeModalIsOpen(false)}
          label="Internet explorer varoitus"
          aria={{
            labelledby: 'Internet explorer varoitus',
            modal: true,
          }}
        >
          <aside id="Internet explorer varoitus">
            <PrivacyPolicy />
            <ButtonContainer
              className="accept-rules-icon-btn icon-btn"
              onClick={() => setIeModalIsOpen(false)}
              role="link"
              label="Sulje dialogi"
            >
              <div className="go-back-button" />
            </ButtonContainer>
            <ButtonContainer
              className="profile-modal-button accept-rules-modal-button"
              onClick={() => setIeModalIsOpen(false)}
              role="link"
              label="Sulje dialogi"
            >
              Sulje
            </ButtonContainer>
          </aside>
        </ModalContainer>
      </div>
    </ModalContainer>
  )
}

export default IEWarningBanner
