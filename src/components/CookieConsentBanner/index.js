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
      closeModal={() => {}}
      cookie
    >
      <div className="cookie-info-container">
        <CookieConsent
          buttonText="Hyväksy"
          onAccept={closeModal}
          buttonStyle={{
            color: '#3a3a3a',
            fontSize: '0.900rem',
            background: '#f59023',
            display: 'flex',
          }}
        >
          Kohdataan-somessa käytämme evästeitä sisäänkirjautumiseen ja
          analysointiin. Voit lukea lisää evästeistä{' '}
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
