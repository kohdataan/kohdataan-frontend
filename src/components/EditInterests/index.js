import React, { useState, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Interests from '../RegistrationFlow/Interests'
import EditTitle from '../EditProfile/EditTitle'
import ButtonContainer from '../ButtonContainer'
import ModalContainer from '../ModalContainer'

const EditInterests = (props) => {
  const {
    currentInterestIds,
    handleInterestEditReady,
    interestOptions,
    history,
  } = props
  const [newInterests, setNewInterests] = useState([...currentInterestIds])
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSubmit = () => {
    if (newInterests.length < 3) {
      setShowModal(true)
    } else {
      handleInterestEditReady(newInterests)
      history.push('/me')
    }
  }

  return (
    <div className="interests-container">
      <EditTitle text="Muokkaa profiiliasi" history={history} />
      <Interests
        options={interestOptions}
        interests={newInterests}
        setInterests={setNewInterests}
        hideStep
      />
      <div style={{ marginBottom: '100px', textAlign: 'center' }}>
        <ButtonContainer
          secondary
          onClick={handleSubmit}
          className="save-interests-button"
        >
          Tallenna
        </ButtonContainer>
      </div>
      <ModalContainer
        modalIsOpen={showModal}
        closeModal={closeModal}
        label="User must have at least 3 interests"
      >
        <div>
          <h3 className="interests-modal-text">
            Valitse ainakin kolme kiinnostavaa asiaa.
          </h3>
          <p>Voit lisätä valinnan klikkaamalla.</p>
          <ButtonContainer
            className="icon-btn interests-icon-btn"
            onClick={closeModal}
            label="Sulje dialogi"
            role="link"
          >
            <div className="go-back-button" />
          </ButtonContainer>
        </div>
      </ModalContainer>
    </div>
  )
}

EditInterests.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  handleInterestEditReady: propTypes.func.isRequired,
  interestOptions: propTypes.instanceOf(Array).isRequired,
  currentInterestIds: propTypes.instanceOf(Array).isRequired,
}

export default memo(EditInterests)
