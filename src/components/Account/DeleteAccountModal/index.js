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
          Poista käyttäjätili pysyvästi. Tämän jälkeen et voi enää palauttaa
          tiliäsi.
        </p>

        <ButtonContainer className="account-delete-button" onClick={deleteUser}>
          Poista käyttäjätili
        </ButtonContainer>
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
