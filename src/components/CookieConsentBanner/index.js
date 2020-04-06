import React from 'react'
import PropTypes from 'prop-types'
import CookieConsent from 'react-cookie-consent'
import ModalContainer from '../ModalContainer'
import './styles.scss'

const CookieConsentBanner = props => {
  const { modalIsOpen, closeModal } = props
  return (
    <ModalContainer
      label="cookie-banner-modal"
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      cookie
    >
      <div className="cookie-info-container">
        <CookieConsent
          buttonText="Hyväksy"
          onAccept={closeModal}
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
          Kohdataan-somessa käytämme evästeitä, jotta palvelu toimii ja sitä voi 
          käyttää. Voit lukea lisää evästeistä {' '}
          <a href=" https://kohdataan.fi/tietosuojaseloste/">
            tietosuojaselosteesta.
          </a>
        </CookieConsent>
      </div>
    </ModalContainer>
  )
}

CookieConsentBanner.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default CookieConsentBanner
