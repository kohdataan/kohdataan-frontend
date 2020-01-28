import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ModalContainer from '../ModalContainer'
import './styles.scss'
import botIcon from '../../assets/bot.svg'
import ButtonContainer from '../ButtonContainer'
import RegistrationProblemContainer from '../../containers/RegistrationProblemContainer'
import PageInformation from './PageInformation'

const BottomNavigationBot = props => {
  const { handleLogout, path, inChat, direct } = props

  const [showBot, setShowBot] = useState(false)
  const [showPageInformation, setShowPageInformation] = useState(false)
  const [showSendMessage, setShowSendMessage] = useState(false)
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

  return (
    <div className={inChat ? 'nav-bot-chat' : 'nav-bot'}>
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
            <Link to="/account" onClick={() => closeModal(setShowBot)}>
              <i className="fas fa-cog modal-icon" aria-hidden="true" />
              Rekisteröitymis&shy;tiedot
            </Link>
          </div>
          <hr />
          <ButtonContainer
            className="bot-link"
            role="link"
            tabIndex={0}
            onClick={() => {
              handleLogout()
              closeModal(setShowBot)
            }}
          >
            <i className="fas fa-cog modal-icon" aria-hidden="true" />
            Kirjaudu ulos
          </ButtonContainer>
        </div>
        <ButtonContainer
          className="button-close"
          onClick={() => closeModal(setShowBot)}
        >
          Sulje
        </ButtonContainer>
      </ModalContainer>
    </div>
  )
}

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
