import React, { useState, memo } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Picture from '../RegistrationFlow/Picture'
import Description from '../RegistrationFlow/Description'
import Nickname from '../RegistrationFlow/Nickname'
import ShowAge from '../RegistrationFlow/ShowAge'
import Location from '../RegistrationFlow/Location'
import ButtonContainer from '../ButtonContainer'
import EditTitle from './EditTitle'
import getAge from '../../utils/getAge'
import './styles.scss'

const EditProfile = props => {
  const { myUserInfo, updateProfilePicture, handleEditReady } = props

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

  const handleSave = () => {
    handleEditReady(
      newDescription,
      newNickname,
      newShowAge,
      newShowLocation,
      newLocation.value
    )
    if (img) {
      updateProfilePicture(img)
    }
  }

  return (
    <main className="profile-edit-container">
      <EditTitle text="Muokkaa profiiliasi" />
      <div className="edit-wrapper">
        <div className="edit-profilepic">
          <Picture hideStep onChange={setImg} />
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
            age={getAge(myUserInfo)}
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
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  updateProfilePicture: propTypes.func.isRequired,
  handleEditReady: propTypes.func.isRequired,
}

export default memo(EditProfile)
