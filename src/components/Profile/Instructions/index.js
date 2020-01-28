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
    THIS_IS_FRIENDS: 4,
    THIS_IS_GROUPS: 5,
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
        <p className="profile-modal-header">
          Profiilisi tiedot näkyvät myös muille.
        </p>
        <p className="profile-modal-header">Voit muokata tietoja täältä.</p>
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
          <ArrowUp className="profile-instructions-arrow-up instructions-arrow" />
        )}
      <ModalContainer
        modalIsOpen={showModals[modals.THIS_IS_YOUR_PROFILE]}
        closeModal={closeModal(modals.THIS_IS_YOUR_PROFILE)}
        label="this-is-your-profile"
      >
        <p className="profile-modal-text">Tämä on oma profiilisi!</p>
        <p className="profile-modal-text">Löydät sen täältä.</p>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_YOUR_PROFILE)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_YOUR_PROFILE] && (
        <ArrowDown className="profile-instructions-arrow-down instructions-arrow" />
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
        <p className="profile-modal-text">
          Jos tarvitset apua, tai haluat lähettää ylläpidolle viestin, voit
          klikata Bottia.
        </p>
        <p className="profile-modal-text">Löydät botin täältä.</p>
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
          <ArrowDown className="bot-instructions-arrow-down instructions-arrow" />
        )}
      <ModalContainer
        modalIsOpen={showModals[modals.THIS_IS_FRIENDS]}
        closeModal={closeModal(modals.THIS_IS_FRIENDS)}
        label="this-is-friends-page"
      >
        <p className="profile-modal-text">
          Voit viestitellä kavereiden kanssa kahdestaan.
        </p>
        <p className="profile-modal-text">Löydät kaverit täältä.</p>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_FRIENDS)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_FRIENDS] && (
        <ArrowDown className="friends-instructions-arrow-down instructions-arrow" />
      )}
      <ModalContainer
        modalIsOpen={showModals[modals.THIS_IS_GROUPS]}
        closeModal={closeModal(modals.THIS_IS_GROUPS)}
        label="this-is-groups-page"
      >
        <p className="profile-modal-text">
          Voit jutella ja tutustua uusiin ihmisiin ryhmissä.
        </p>
        <p className="profile-modal-text">Löydät ryhmät täältä.</p>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_GROUPS)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_GROUPS] &&(
        <ArrowDown className="groups-instructions-arrow-down instructions-arrow" />
      )}
    </div>
  )
}

Instructions.propTypes = {
  showModals: propTypes.instanceOf(Object).isRequired,
  closeModal: propTypes.func.isRequired,
}

export default memo(Instructions)
