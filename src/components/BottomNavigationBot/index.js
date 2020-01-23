import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ModalContainer from '../ModalContainer'
import './styles.scss'
import botIcon from '../../assets/bot.svg'
import ButtonContainer from '../ButtonContainer'

const BottomNavigationBot = props => {
  const { handleLogout, inChat } = props

  const [showBot, setShowBot] = useState(false)
  const openModal = () => setShowBot(true)
  const closeModal = () => setShowBot(false)

  return (
    <div className={inChat ? 'nav-bot-chat' : 'nav-bot'}>
      <ButtonContainer className="button-image" onClick={openModal}>
        <img src={botIcon} alt="Botti" />
      </ButtonContainer>
      <ModalContainer
        modalIsOpen={showBot}
        closeModal={closeModal}
        label="Botti"
      >
        <div className="modal-content">
          <div className="modal-item">
            <i
              className="fas fa-question-circle modal-icon"
              aria-hidden="true"
            />
            Mitä tällä sivulla voi tehdä
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-flag modal-icon" aria-hidden="true" />
            Ilmianna asiaton viesti
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-life-ring modal-icon" aria-hidden="true" />
            Lähetä moderaattorille viesti
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
            <Link to="/account" onClick={() => closeModal()}>
              <i className="fas fa-cog modal-icon" aria-hidden="true" />
              Rekisteröitymis&shy;tiedot
            </Link>
          </div>
          <hr />
          <div
            className="modal-item"
            role="link"
            tabIndex={0}
            onClick={() => {
              handleLogout()
              closeModal()
            }}
            onKeyDown={() => {
              handleLogout()
              closeModal()
            }}
          >
            <i className="fas fa-cog modal-icon" aria-hidden="true" />
            Kirjaudu ulos
          </div>
        </div>
        <ButtonContainer className="button-close" onClick={closeModal}>
          Sulje
        </ButtonContainer>
      </ModalContainer>
    </div>
  )
}

BottomNavigationBot.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  inChat: PropTypes.bool,
}

BottomNavigationBot.defaultProps = {
  inChat: false,
}

export default memo(BottomNavigationBot)
