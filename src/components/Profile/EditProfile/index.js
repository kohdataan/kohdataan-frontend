import React, { memo } from 'react'
import propTypes from 'prop-types'
import Picture from '../../RegistrationFlow/Picture'
import Description from '../../RegistrationFlow/Description'
import Nickname from '../../RegistrationFlow/Nickname'
import ShowAge from '../../RegistrationFlow/ShowAge'
import Location from '../../RegistrationFlow/Location'
import ButtonContainer from '../../ButtonContainer'
import EditTitle from '../EditTitle'
import './styles.scss'

const EditProfile = props => {
  const {
    myUserInfo,
    user,
    currentUser,
    userInterests,
    interestOptions,
    addUserInterests,
    updateProfilePicture,
    updateUser,
    handleEditReady,
    newNickname,
    setNewNickname,
    setImg,
  } = props

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
            value={newNickname || myUserInfo.nickname}
            onChange={e => setNewNickname(e.target.value)}
          />
        </div>
        <div className="edit-nickname">
          <ShowAge hideStep showAge={myUserInfo.showAge.toString()} />
        </div>
        <div className="edit-nickname">
          <Location hideStep />
        </div>
        <div className="edit-nickname">
          <Description hideStep />
        </div>
        <div
          className="save-profile-button"
          style={{ marginBottom: '100px', textAlign: 'center' }}
        >
          <ButtonContainer secondary onClick={handleEditReady}>
            Tallenna
          </ButtonContainer>
        </div>
      </div>
    </main>
  )
}

EditProfile.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  userInterests: propTypes.instanceOf(Array).isRequired,
  interestOptions: propTypes.instanceOf(Array).isRequired,
  addUserInterests: propTypes.func,
  updateProfilePicture: propTypes.func,
  currentUser: propTypes.instanceOf(Object),
  updateUser: propTypes.func,
  setImg: propTypes.func,
}

EditProfile.defaultProps = {
  updateUser: null,
  currentUser: null,
  addUserInterests: null,
  updateProfilePicture: null,
  setImg: null,
}

export default memo(EditProfile)
