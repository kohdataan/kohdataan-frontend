import React, { useState } from 'react'
import CookieConsent from 'react-cookie-consent'
import ModalContainer from '../ModalContainer'
import ButtonContainer from '../ButtonContainer'
import PrivacyPolicy from '../PrivacyPolicy'
import './styles.scss'

const CookieConsentBanner = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [privacyPolicyModalIsOpen, setPrivacyPolicyModalIsOpen] =
    useState(false)

  const acceptCookies = () => {
    setModalIsOpen(false)
  }

  return (
    <ModalContainer
      label="Hyväksy evästeet"
      modalIsOpen={modalIsOpen}
      closeModal={() => {}}
      cookie
    >
      <div className="cookie-info-container">
        <CookieConsent
          buttonText="Hyväksy"
          onAccept={acceptCookies}
          style={{
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '10px',
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
          }}
          contentStyle={{
            flex: '0 auto',
            margin: '15px',
          }}
        >
          Kohdataan-somessa käytämme evästeitä, jotta palvelu toimii ja sitä voi
          käyttää. Voit lukea lisää evästeistä &nbsp;
          <ButtonContainer
            className="modal-btn"
            role="link"
            onClick={() => setPrivacyPolicyModalIsOpen(true)}
          >
            tietosuojaselosteesta.
          </ButtonContainer>
        </CookieConsent>
        <ModalContainer
          modalIsOpen={privacyPolicyModalIsOpen}
          closeModal={() => setPrivacyPolicyModalIsOpen(false)}
          label="Tietosuojaseloste"
          isLong
          aria={{
            labelledby: 'Tietosuojaseloste',
            modal: true,
          }}
        >
          <aside id="Tietosuojaseloste">
            <PrivacyPolicy
              closeModal={() => setPrivacyPolicyModalIsOpen(false)}
            />
          </aside>
        </ModalContainer>
      </div>
    </ModalContainer>
  )
}

export default CookieConsentBanner
