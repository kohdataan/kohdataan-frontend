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
          Valittuasi poista käyttäjätili et voi enää palauttaa tiliäsi. Haluatko
          varmasti poistaa käyttäjätilin lopullisesti?
        </p>
        <div className="account-delete-buttons-wrapper">
          <ButtonContainer
            className="account-cancel-delete-button"
            onClick={closeModal}
            secondary
          >
            Peruuta
          </ButtonContainer>

          <ButtonContainer
            className="account-delete-button"
            onClick={deleteUser}
          >
            Poista käyttäjätili
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
