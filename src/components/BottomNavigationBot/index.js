import React, { memo } from 'react'
import Modal from 'react-modal'
import './styles.scss'
import botIcon from '../../assets/bot.svg'

Modal.setAppElement('#root')

class BottomNavigationBot extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  render() {
    const { showModal } = this.state
    return (
      <div className="nav-bot">
        <button
          type="button"
          className="button-image"
          onClick={this.handleOpenModal}
        >
          <img src={botIcon} alt="Botti" />
        </button>
        <Modal
          isOpen={showModal}
          contentLabel="Botti"
          className="modal"
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <div className="modal-item">
            <i className="fas fa-question-circle modal-icon" />
            <div className="modal-text">Mitä tällä sivulla voi tehdä</div>
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-flag modal-icon" />
            Ilmianna asiaton viesti
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-life-ring modal-icon" />
            <div className="modal-text">Lähetä moderaattorille viesti</div>
          </div>
          <hr />
          <div className="modal-item">
            <i className="fas fa-check-square modal-icon" />
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
            Rekisteröitymistiedot
          </div>
          <button
            type="button"
            className="button-close"
            onClick={this.handleCloseModal}
          >
            Sulje
          </button>
        </Modal>
      </div>
    )
  }
}

export default memo(BottomNavigationBot)
