import React, { memo, useState } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import ModalContainer from '../ModalContainer'
import './styles.scss'

const ServiceRules = ({ setRulesAccepted, setOpenErrorModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setOpenErrorModal(true)
    setModalIsOpen(false)
  }

  const acceptRules = () => {
    setRulesAccepted(true)
    setModalIsOpen(false)
  }

  return (
    <div id="service-rules-container">
      <div className="service-rules-content">
        <ButtonContainer className="accept-rules-link" onClick={openModal}>
          Hyväksy palvelun käyttöehdot
        </ButtonContainer>
        <ModalContainer
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          label="Hyväksy käyttösäännöt-dialogi"
          aria={{
            labelledby: 'Hyväksy käyttösäännöt-dialogi',
            modal: true,
          }}
        >
          <aside className="service-rules-content">
            <h2 className="service-rules-header">Palvelun käyttöehdot</h2>
            <div className="service-rules-text">
              <p>Tänne tulee palvelun käyttöehdot.</p>
            </div>
            <ButtonContainer
              className="accept-rules-icon-btn icon-btn"
              onClick={closeModal}
              label="Sulje"
            >
              <div className="go-back-button" />
            </ButtonContainer>
            <ButtonContainer
              className="profile-modal-button accept-rules-modal-button"
              onClick={acceptRules}
            >
              Hyväksy
            </ButtonContainer>
          </aside>
        </ModalContainer>
      </div>
    </div>
  )
}

ServiceRules.propTypes = {
  setRulesAccepted: propTypes.func.isRequired,
  setOpenErrorModal: propTypes.func.isRequired,
}

export default memo(ServiceRules)
