import React, { useState, memo } from 'react'
import ModalContainer from '../ModalContainer'
import './styles.scss'
import botIcon from '../../assets/bot.svg'

const BottomNavigationBot = () => {
  const [showBot, setShowBot] = useState(false)
  const openModal = () => setShowBot(true)
  const closeModal = () => setShowBot(false)

  return (
    <div className="nav-bot">
      <button type="button" className="button-image" onClick={openModal}>
        <img src={botIcon} alt="Botti" />
      </button>
      <ModalContainer
        modalIsOpen={showBot}
        closeModal={closeModal}
        label="Botti"
      >
        <div className="modal-content">
          <div className="modal-item">
            <i className="fas fa-question-circle modal-icon" />
            Mitä tällä sivulla voi tehdä
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-flag modal-icon" />
            Ilmianna asiaton viesti
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-life-ring modal-icon" />
            Lähetä moderaattorille viesti
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-shield-check modal-icon" />
            Palvelun säännöt
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-info-circle modal-icon" />
            Yleiset ohjeet
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-cog modal-icon" />
            Rekisteröitymis&shy;tiedot
          </div>
        </div>
        <button type="button" className="button-close" onClick={closeModal}>
          Sulje
        </button>
      </ModalContainer>
    </div>
  )
}

export default memo(BottomNavigationBot)
