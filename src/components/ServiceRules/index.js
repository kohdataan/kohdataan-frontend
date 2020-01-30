import React, { memo, useState } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import ModalContainer from '../ModalContainer'
import './styles.scss'

const ServiceRules = ({ setRulesAccepted }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const acceptRules = () => {
    setRulesAccepted(true)
    setModalIsOpen(false)
  }

  return (
    <main id="service-rules-container">
      <div className="service-rules-content">
        <ButtonContainer className="accept-rules-link" onClick={openModal}>
          {'Hyväksy palvelun käyttöehdot'}
        </ButtonContainer>
        <ModalContainer
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          label="accept-rules-dialog"
        >
          <div className="service-rules-content">
            <h2 className="service-rules-header">Palvelun käyttöehdot</h2>
            <div className="service-rules-text">
              <p>Tänne tulee palvelun käyttöehdot.</p>
            </div>
            <ButtonContainer className="accept-rules-icon-btn icon-btn" onClick={closeModal}>
              <div className="accept-rules-go-back-button go-back-button" />
            </ButtonContainer>
            <ButtonContainer
              className="profile-modal-button accept-rules-modal-button"
              onClick={acceptRules}
            >
              Hyväksy
            </ButtonContainer>
          </div>
        </ModalContainer>
      </div>
    </main>
  )
}

ServiceRules.propTypes = {
  setRulesAccepted: propTypes.func.isRequired,
}

export default memo(ServiceRules)
