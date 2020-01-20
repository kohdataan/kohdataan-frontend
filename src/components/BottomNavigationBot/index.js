import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ModalContainer from '../ModalContainer'
import './styles.scss'
import botIcon from '../../assets/bot.svg'
import ButtonContainer from '../ButtonContainer'
import PageInformation from './PageInformation'

const BottomNavigationBot = props => {
  const { handleLogout, pathname } = props

  const [showBot, setShowBot] = useState(false)
  const [showPageInformation, setShowPageInformation] = useState(false)
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

  return (
    <div className="nav-bot">
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
            <div
              className="bot-link"
              role="link"
              tabIndex={0}
              onClick={openPageInformationModal}
              onKeyDown={() => {
                openPageInformationModal()
              }}
            >
              Mitä tällä sivulla voi tehdä
            </div>
            <ModalContainer
              modalIsOpen={showPageInformation}
              closeModal={() => closeModal(setShowPageInformation)}
              label="PageInformation"
            >
              <PageInformation
                path={pathname}
                handleClick={closePageInformationModal}
              />
            </ModalContainer>
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-flag modal-icon" aria-hidden="true" />
            Ilmianna asiaton viesti
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-life-ring modal-icon" aria-hidden="true" />
            <Link
              className="bot-link"
              to="/registrationproblem"
              onClick={() => setShowBot(false)}
            >
              Lähetä moderaattorille viesti
            </Link>
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-check-square modal-icon" aria-hidden="true" />
            Palvelun säännöt
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-info-circle modal-icon" aria-hidden="true" />
            Yleiset ohjeet
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-cog modal-icon" aria-hidden="true" />
            Rekisteröitymis&shy;tiedot
          </div>
          <hr />
          <div
            className="modal-item"
            role="link"
            tabIndex={0}
            onClick={() => {
              handleLogout()
              closeModal(setShowBot)
            }}
            onKeyDown={() => {
              handleLogout()
              closeModal(setShowBot)
            }}
          >
            <i className="fas fa-cog modal-icon" aria-hidden="true" />
            Kirjaudu ulos
          </div>
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
  pathname: PropTypes.string.isRequired,
}

export default memo(BottomNavigationBot)
