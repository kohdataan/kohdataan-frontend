import React, { memo } from 'react'
import propTypes from 'prop-types'
import ModalContainer from '../../ModalContainer'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const DeleteAccountModal = props => {
  const { showModal, deleteUser, closeModal, deleteError } = props

  return (
    <div className="leave-channel-modal-wrapper">
      <ModalContainer
        modalIsOpen={showModal}
        label="leaveChannelModal"
        closeModal={closeModal}
      >
        <p>
          Poistamme käyttäjätilisi viikon päästä, jos et ota tiliäsi ennen sitä
          uudelleen käyttöön. Voit ottaa tilisi uudelleen käyttöön, kun
          kirjaudut palveluun. Viikon jälkeen poistamme tilisi ja profiilisi
          pysyvästi. Viestisi jäävät palveluun nimettömänä.
        </p>
        <p>Haluatko varmasti poistaa käyttäjätilisi?</p>
        <div className="account-delete-buttons-wrapper">
          <ButtonContainer
            className="account-cancel-delete-button"
            onClick={closeModal}
            secondary
          >
            En
          </ButtonContainer>

          <ButtonContainer
            className="account-delete-button"
            onClick={deleteUser}
          >
            Kyllä
          </ButtonContainer>
        </div>
        {deleteError && (
          <p
            className="edit-account-error-text"
            style={{ textAlign: 'center' }}
          >
            Käyttäjätilin poistaminen epäonnistui!
          </p>
        )}
      </ModalContainer>
    </div>
  )
}

DeleteAccountModal.propTypes = {
  showModal: propTypes.bool.isRequired,
  deleteUser: propTypes.func.isRequired,
  closeModal: propTypes.func.isRequired,
  deleteError: propTypes.string,
}

DeleteAccountModal.defaultProps = {
  deleteError: null,
}

export default memo(DeleteAccountModal)
