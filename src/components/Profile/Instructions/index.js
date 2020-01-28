import React, { memo } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'
import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg'
import { ReactComponent as ArrowUp } from '../../../assets/arrow-up.svg'
import './styles.scss'

const Instructions = props => {
  const { showModals, closeModal } = props

  const modals = {
    PROFILE_INFO_IS_PUBLIC: 1,
    THIS_IS_YOUR_PROFILE: 2,
    THIS_IS_THE_BOT: 3,
  }
  return (
    <div className="profile-instructions">
      <ModalContainer
        modalIsOpen={
          showModals[modals.PROFILE_INFO_IS_PUBLIC] &&
          !showModals[modals.THIS_IS_YOUR_PROFILE]
        }
        closeModal={closeModal(modals.PROFILE_INFO_IS_PUBLIC)}
        label="profile-info-is-public"
      >
        <h2 className="profile-modal-header">
          Profiilisi tiedot näkyvät myös muille.
        </h2>
        <h2 className="profile-modal-header">
          Jatkossa voit muokata tietojasi täältä.
        </h2>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.PROFILE_INFO_IS_PUBLIC)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.PROFILE_INFO_IS_PUBLIC] &&
        !showModals[modals.THIS_IS_YOUR_PROFILE] &&
        showModals[modals.THIS_IS_THE_BOT] && (
          <ArrowUp className="profile-instructions-arrow-up" />
        )}
      <ModalContainer
        modalIsOpen={showModals[modals.THIS_IS_YOUR_PROFILE]}
        closeModal={closeModal(modals.THIS_IS_YOUR_PROFILE)}
        label="this-is-your-profile"
      >
        <h2 className="profile-modal-header">
          Tämä on oma profiilisi! Jatkossa löydät sen täältä.
        </h2>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_YOUR_PROFILE)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_YOUR_PROFILE] && (
        <ArrowDown className="profile-instructions-arrow-down" />
      )}
      <ModalContainer
        modalIsOpen={
          showModals[modals.THIS_IS_THE_BOT] &&
          !(
            showModals[modals.THIS_IS_YOUR_PROFILE] ||
            showModals[modals.PROFILE_INFO_IS_PUBLIC]
          )
        }
        closeModal={closeModal(modals.THIS_IS_THE_BOT)}
        label="this-is-the-bot"
      >
        <h2 className="profile-modal-header">
          Jos tarvitset apua palvelun käyttöön tai haluat lähettää ylläpidolle
          viestin, voit klikata Bottia.
        </h2>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_THE_BOT)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_THE_BOT] &&
        !showModals[modals.THIS_IS_YOUR_PROFILE] &&
        !showModals[modals.PROFILE_INFO_IS_PUBLIC] && (
        <ArrowDown className="bot-instructions-arrow-down" />
      )}
    </div>
  )
}

Instructions.propTypes = {
  showModals: propTypes.instanceOf(Object).isRequired,
  closeModal: propTypes.func.isRequired,
}

export default memo(Instructions)
