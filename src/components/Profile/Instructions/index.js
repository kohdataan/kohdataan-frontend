import React from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'
import './styles.scss'
import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg'
import { ReactComponent as ArrowUp } from '../../../assets/arrow-up.svg'

const Instructions = props => {
  const { showModal1, showModal2, closeModal } = props
  return (
    <div className="profile-instructions">
      <ModalContainer
        modalIsOpen={showModal2 && !showModal1}
        closeModal={closeModal(2)}
        label="profile-instructions-modal-2"
      >
        <h2 className="profile-modal-header">
          Profiilisi tiedot näkyvät myös muille.
        </h2>
        <h2 className="profile-modal-header">
          Jatkossa voit muokata tietojasi täältä.
        </h2>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(2)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModal2 && !showModal1 && (
        <ArrowUp className="profile-instructions-arrow-up" />
      )}
      <ModalContainer
        modalIsOpen={showModal1}
        closeModal={closeModal(1)}
        label="profile-instructions-modal-1"
      >
        <h2 className="profile-modal-header">
          Tämä on oma profiilisi! Jatkossa löydät sen täältä.
        </h2>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(1)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModal1 && <ArrowDown className="profile-instructions-arrow-down" />}
    </div>
  )
}

Instructions.propTypes = {
  showModal1: propTypes.bool.isRequired,
  showModal2: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
}

export default Instructions
