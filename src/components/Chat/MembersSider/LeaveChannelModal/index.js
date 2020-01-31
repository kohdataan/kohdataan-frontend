import React, { memo } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonContainer from '../../../ButtonContainer'
import ModalContainer from '../../../ModalContainer'
import './styles.scss'

const LeaveChannelModal = props => {
  const { showConfirmation, closeModal, handleLeaveChannel } = props
  return (
    <div className="leave-channel-modal-wrapper">
      <ModalContainer
        modalIsOpen={showConfirmation}
        closeModal={closeModal}
        label="leaveChannelModal"
      >
        <h2>Haluatko varmasti poistua ryhmästä?</h2>
        <ButtonContainer
          onClick={closeModal}
          className="cancel-leave-channel-button"
        >
          En
        </ButtonContainer>
        <Link className="leave-channel-link" to="/">
          <ButtonContainer
            onClick={handleLeaveChannel}
            className="confirm-leave-channel-button"
          >
            Kyllä
          </ButtonContainer>
        </Link>
      </ModalContainer>
    </div>
  )
}

LeaveChannelModal.propTypes = {
  showConfirmation: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  handleLeaveChannel: propTypes.func.isRequired,
}

export default memo(LeaveChannelModal)
