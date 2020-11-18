import React, { useEffect, useState, memo } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ModalContainer from '../ModalContainer'
import Picture from '../RegistrationFlow/Picture'
import Description from '../RegistrationFlow/Description'
import Nickname from '../RegistrationFlow/Nickname'
import ShowAge from '../RegistrationFlow/ShowAge'
import Location from '../RegistrationFlow/Location'
import ButtonContainer from '../ButtonContainer'
import EditTitle from './EditTitle'
// import getAge from '../../utils/getAge'
import './styles.scss'

const EditProfile = props => {
  const { history, myUserInfo, handleEditReady } = props
  const [newDescription, setNewDescription] = useState(
    myUserInfo.description || ''
  )
  const [newNickname, setNewNickname] = useState(myUserInfo.nickname)
  const [newShowAge, setNewShowAge] = useState(myUserInfo.showAge)
  const [newShowLocation, setNewShowLocation] = useState(
    myUserInfo.showLocation
  )
  const [newLocation, setNewLocation] = useState({
    label: myUserInfo.location,
    value: myUserInfo.location,
  })
  const [img, setImg] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const checkForErrors = () => {
      if (error) setShowModal(true)
    }
    checkForErrors()
  }, [error])

  const closeModal = () => {
    setShowModal(false)
    setError(false)
  }
  const handleSave = () => {
    handleEditReady(
      newDescription,
      newNickname,
      newShowAge,
      newShowLocation,
      newLocation.value,
      img
    )
  }

  return (
    <main className="profile-edit-container">
      <ModalContainer
        modalIsOpen={showModal}
        closeModal={closeModal}
        label="Tiedosto liian suuri"
      >
        <div>
          <h3 className="edit-profile-modal-text">Tiedosto on liian suuri!</h3>
          <ButtonContainer
            className="icon-btn edit-profile-icon-btn"
            onClick={closeModal}
            label="Sulje"
          >
            <div className="go-back-button" />
          </ButtonContainer>
        </div>
      </ModalContainer>
      <EditTitle text="Muokkaa profiiliasi" history={history} />
      <div className="edit-wrapper">
        <div className="edit-profilepic">
          <Picture hideStep onChange={setImg} image={img} />
        </div>
        <div className="edit-nickname">
          <Nickname
            hideStep
            value={newNickname}
            onChange={e => setNewNickname(e.target.value)}
          />
        </div>
        <div className="edit-nickname">
          <ShowAge
            hideStep
            showAge={newShowAge.toString()}
            age={myUserInfo && myUserInfo.birthdate}
            onChange={setNewShowAge}
          />
        </div>
        <div className="edit-nickname">
          <Location
            hideStep
            showLocation={newShowLocation.toString()}
            value={newLocation}
            setShowLocation={setNewShowLocation}
            onChange={value => setNewLocation(value)}
          />
        </div>
        <div className="edit-nickname">
          <Description
            value={newDescription}
            hideStep
            onChange={e => setNewDescription(e.target.value)}
          />
        </div>
        <div
          className="save-profile-button"
          style={{ marginBottom: '100px', textAlign: 'center' }}
        >
          <Link to="/me">
            <ButtonContainer
              secondary
              className="save-profile-button"
              onClick={handleSave}
            >
              Tallenna
            </ButtonContainer>
          </Link>
        </div>
      </div>
    </main>
  )
}

EditProfile.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  handleEditReady: propTypes.func.isRequired,
}

export default memo(EditProfile)
