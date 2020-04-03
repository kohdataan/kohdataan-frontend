import React, { useState, memo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ModalContainer from '../ModalContainer'
import './styles.scss'
import botIcon from '../../assets/bot.svg'
import ButtonContainer from '../ButtonContainer'
import RegistrationProblemContainer from '../../containers/RegistrationProblemContainer'
import PageInformation from './PageInformation'

const BottomNavigationBot = forwardRef((props, ref) => {
  const { handleLogout, path, inChat, direct } = props

  const [showBot, setShowBot] = useState(false)
  const [showPageInformation, setShowPageInformation] = useState(false)
  const [showSendMessage, setShowSendMessage] = useState(false)
  const [logOutConfirmation, setLogOutConfirmation] = useState(false)
  const openModal = setter => setter(true)
  const closeModal = setter => setter(false)

  const openPageInformationModal = () => {
    setShowPageInformation(true)
    openModal(setShowPageInformation)
  }

  const closePageInformationModal = () => {
    setShowPageInformation(false)
    closeModal(setShowPageInformation)
  }

  const openSendMessageModal = () => {
    setShowSendMessage(true)
    openModal(setShowSendMessage)
  }

  const closeSendMessageModal = () => {
    setShowSendMessage(false)
    closeModal(setShowSendMessage)
  }

  const openLogOutModal = () => {
    setLogOutConfirmation(true)
    openModal(setLogOutConfirmation)
  }

  return (
    <div className={inChat ? 'nav-bot-chat' : 'nav-bot'} ref={ref}>
      <ButtonContainer
        className="button-image"
        onClick={() => openModal(setShowBot)}
      >
        <img src={botIcon} alt="Botti" />
      </ButtonContainer>
      <ModalContainer
        modalIsOpen={showBot}
        closeModal={() => closeModal(setShowBot)}
        label="Botti"
      >
        <div className="modal-content">
          <div className="modal-item">
            <i
              className="fas fa-question-circle modal-icon"
              aria-hidden="true"
            />
            <ButtonContainer
              className="bot-link"
              role="link"
              tabIndex={0}
              onClick={openPageInformationModal}
            >
              Mitä tällä sivulla tehdään
            </ButtonContainer>
            <ModalContainer
              modalIsOpen={showPageInformation}
              closeModal={() => closeModal(setShowPageInformation)}
              label="PageInformation"
            >
              <PageInformation
                path={path}
                handleClick={closePageInformationModal}
                direct={direct}
                inChat={inChat}
              />
            </ModalContainer>
          </div>
          <hr />
          <div className="modal-content">
            <div className="modal-item">
              <i className="fas fa-life-ring modal-icon" aria-hidden="true" />
              <ButtonContainer
                className="bot-link"
                role="link"
                tabIndex={0}
                onClick={openSendMessageModal}
              >
                Lähetä valvojalle viesti
              </ButtonContainer>
              <ModalContainer
                modalIsOpen={showSendMessage}
                isLong
                closeModal={() => closeModal(setShowSendMessage)}
                label="SendMessage"
              >
                <RegistrationProblemContainer
                  handleClick={closeSendMessageModal}
                />
              </ModalContainer>
            </div>
          </div>
          <hr />
          <div className="modal-item inactive-item">
            <i className="fas fa-check-square modal-icon" aria-hidden="true" />
            Palvelun säännöt
          </div>
          <hr />
          <div className="modal-item inactive-item">
            <i className="fas fa-info-circle modal-icon" aria-hidden="true" />
            Yleiset ohjeet
          </div>
          <hr />
          <div className="modal-item">
            <div>
              <i className="fas fa-cog modal-icon" aria-hidden="true" />
            </div>
            <Link to="/account" onClick={() => closeModal(setShowBot)}>
              Rekisteröitymis&shy;tiedot
            </Link>
          </div>
          <hr />
          <div>
            <i className="fas fa-sign-out-alt modal-icon" aria-hidden="true" />
          </div>
          <ButtonContainer
            className="bot-link"
            role="link"
            tabIndex={0}
            onClick={openLogOutModal}
          >
            Kirjaudu ulos
          </ButtonContainer>
          <ModalContainer
            modalIsOpen={logOutConfirmation}
            closeModal={() => closeModal(setLogOutConfirmation)}
            label="ConfirmLogout"
          >
            <div>
              <h3 className="interests-modal-text">
                Haluatko varmasti kirjautua ulos?
              </h3>
              <ButtonContainer
                className="button button-secondary log-out-btn"
                onClick={() => closeModal(setLogOutConfirmation)}
              >
                En
              </ButtonContainer>
              <ButtonContainer
                className="button log-out-btn"
                onClick={() => {
                  handleLogout()
                  closeModal(setShowBot)
                }}
              >
                Kyllä
              </ButtonContainer>
            </div>
          </ModalContainer>
        </div>
        <ButtonContainer
          className="button button-close"
          onClick={() => closeModal(setShowBot)}
          label="Sulje"
        >
          Sulje
        </ButtonContainer>
      </ModalContainer>
    </div>
  )
})

BottomNavigationBot.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  inChat: PropTypes.bool,
  direct: PropTypes.bool,
}

BottomNavigationBot.defaultProps = {
  inChat: false,
  direct: false,
}

export default memo(BottomNavigationBot)
