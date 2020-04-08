import React, { memo, useEffect, useState, useRef } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'
import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg'
import { ReactComponent as ArrowUp } from '../../../assets/arrow-up.svg'
import './styles.scss'

const Instructions = props => {
  const {
    showModals,
    closeModal,
    editBtnRef,
    botCoordinates,
    profileCoordinates,
    friendsCoordinates,
    groupsCoordinates,
  } = props

  const arrowRef = useRef()

  const modals = {
    PROFILE_INFO_IS_PUBLIC: 1,
    THIS_IS_YOUR_PROFILE: 2,
    THIS_IS_THE_BOT: 3,
    THIS_IS_FRIENDS: 4,
    THIS_IS_GROUPS: 5,
  }

  const [coordinates, setCoordinates] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  })

  useEffect(() => {
    const newState = {}
    newState[1] = profileCoordinates
    newState[2] =
      editBtnRef &&
      editBtnRef.current &&
      editBtnRef.current.getBoundingClientRect()
    newState[3] = botCoordinates
    newState[4] = friendsCoordinates
    newState[5] = groupsCoordinates
    setCoordinates(newState)
  }, [
    profileCoordinates,
    botCoordinates,
    friendsCoordinates,
    groupsCoordinates,
    setCoordinates,
    editBtnRef,
  ])

  return (
    <div className="profile-instructions">
      <ModalContainer
        tutorial
        modalIsOpen={
          showModals[modals.PROFILE_INFO_IS_PUBLIC] &&
          !showModals[modals.THIS_IS_YOUR_PROFILE]
        }
        closeModal={closeModal(modals.PROFILE_INFO_IS_PUBLIC)}
        label="profile-info-is-public"
      >
        <p className="profile-modal-text">
          Profiilisi tiedot näkyvät myös muille.
        </p>
        <p className="profile-modal-text">
          Voit muokata tietoja täältä, kohdasta Muokkaa.
        </p>
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
          <ArrowUp
            ref={arrowRef}
            className="profile-instructions-arrow-up instructions-arrow"
            style={{
              top: coordinates[2].top + coordinates[2].height / 2,
              left: coordinates[2].left + 40,
              width: '80px',
            }}
          />
        )}
      <ModalContainer
        tutorial
        modalIsOpen={showModals[modals.THIS_IS_YOUR_PROFILE]}
        closeModal={closeModal(modals.THIS_IS_YOUR_PROFILE)}
        label="this-is-your-profile"
      >
        <p className="profile-modal-text">Tämä on oma profiilisi!</p>
        <p className="profile-modal-text">
          Löydät sen täältä, kohdasta Profiili.
        </p>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_YOUR_PROFILE)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_YOUR_PROFILE] &&
        coordinates[1] &&
        coordinates[1].bottom && (
          <ArrowDown
            className="profile-instructions-arrow-down instructions-arrow"
            style={{
              left: coordinates[1].left - 40,
              bottom: coordinates[1].height * 2,
              width: '80px',
            }}
          />
        )}
      <ModalContainer
        tutorial
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
          Jos tarvitset apua tai haluat lähettää valvojalle viestin, voit
          klikata Bottia.
        </p>
        <p className="profile-modal-text">Löydät sen täältä, kohdasta Botti.</p>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_THE_BOT)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_THE_BOT] &&
        !showModals[modals.THIS_IS_YOUR_PROFILE] &&
        !showModals[modals.PROFILE_INFO_IS_PUBLIC] &&
        coordinates[3] &&
        coordinates[3].left && (
          <ArrowDown
            className="bot-instructions-arrow-down instructions-arrow"
            style={{
              bottom: coordinates[3].height * 2,
              left: coordinates[3].left,
              width: '80px',
            }}
          />
        )}
      <ModalContainer
        tutorial
        modalIsOpen={showModals[modals.THIS_IS_FRIENDS]}
        closeModal={closeModal(modals.THIS_IS_FRIENDS)}
        label="this-is-friends-page"
      >
        <p className="profile-modal-text">
          Voit viestitellä kavereiden kanssa kahdestaan.
        </p>
        <p className="profile-modal-text">
          Löydät kaverit täältä, kohdasta Kaverit.
        </p>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_FRIENDS)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_FRIENDS] &&
        coordinates[4] &&
        coordinates[4].bottom && (
          <ArrowDown
            className="friends-instructions-arrow-down instructions-arrow"
            style={{
              bottom: coordinates[4].height * 2,
              right: coordinates[4].right + 40,
              width: '80px',
            }}
          />
        )}
      <ModalContainer
        tutorial
        modalIsOpen={showModals[modals.THIS_IS_GROUPS]}
        closeModal={closeModal(modals.THIS_IS_GROUPS)}
        label="this-is-groups-page"
      >
        <p className="profile-modal-text">
          Voit jutella ja tutustua uusiin ihmisiin ryhmissä.
        </p>
        <p className="profile-modal-text">
          Löydät ryhmät täältä, kohdasta Ryhmät.
        </p>
        <ButtonContainer
          className="profile-modal-button"
          onClick={closeModal(modals.THIS_IS_GROUPS)}
        >
          Ok
        </ButtonContainer>
      </ModalContainer>
      {showModals[modals.THIS_IS_GROUPS] &&
        coordinates[5] &&
        coordinates[5].bottom && (
          <ArrowDown
            className="groups-instructions-arrow-down instructions-arrow"
            style={{
              bottom: coordinates[5].height * 2,
              left: coordinates[5].left - 40,
              width: '80px',
            }}
          />
        )}
    </div>
  )
}

Instructions.propTypes = {
  showModals: propTypes.instanceOf(Object).isRequired,
  closeModal: propTypes.func.isRequired,
  editBtnRef: propTypes.instanceOf(Object),
  botCoordinates: propTypes.instanceOf(Object),
  profileCoordinates: propTypes.instanceOf(Object),
  friendsCoordinates: propTypes.instanceOf(Object),
  groupsCoordinates: propTypes.instanceOf(Object),
}

Instructions.defaultProps = {
  friendsCoordinates: {},
  groupsCoordinates: {},
  editBtnRef: null,
  botCoordinates: {},
  profileCoordinates: {},
}

export default memo(Instructions)
