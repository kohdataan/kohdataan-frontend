import React from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'
import './styles.scss'

const Instructions = props => {
  const { showModal, closeModal } = props
  return (
    <div className="profile-instructions">
      <ModalContainer
        modalIsOpen={showModal}
        closeModal={closeModal}
        label="profile instructions modal"
      >
        <h2 className="profile-modal-header">
          Tämä on oma profiilisi! Jatkossa löydät sen täältä.
        </h2>
        <ButtonContainer className="profile-modal-button" onClick={closeModal}>
          Ok
        </ButtonContainer>
      </ModalContainer>
    </div>
  )
}

Instructions.propTypes = {
  showModal: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
}

export default Instructions
