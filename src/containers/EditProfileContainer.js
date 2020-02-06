import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUser as getUserAction,
  setDefaultProfileImage as setDefaultProfileImageAction,
  uploadProfileImage as uploadProfileImageAction,
} from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import { updateUser as updateUserAction } from '../store/user/userAction'
import dataUriToBlob from '../utils/dataUriToBlob'
import EditProfile from '../components/EditProfile'

const EditProfileContainer = props => {
  const {
    mmuserId,
    currentUser,
    interestOptions,
    updateUser,
    myUserInfo,
    uploadProfileImage,
  } = props

  // Update profile picture
  const updatePicture = img => {
    if (currentUser && img) {
      uploadProfileImage(currentUser.id, dataUriToBlob(img))
    }
  }

  const getNewUsername = nickname => {
    const letter = nickname[0].toLowerCase()
    const firstRemoved = currentUser && currentUser.username.substr(1, 20)
    const updated = letter.concat(firstRemoved)
    return updated
  }

  const handleEditReady = async (
    newDescription,
    newNickname,
    showAge,
    showLocation,
    location
  ) => {
    let updatedUsername
    if (myUserInfo.nickname !== newNickname)
      updatedUsername = getNewUsername(newNickname)

    const newUserInfo = {
      ...myUserInfo,
      mmid: mmuserId,
      description: newDescription,
      nickname: newNickname,
      showAge,
      showLocation,
      location,
      username: updatedUsername,
    }
    await updateUser(newUserInfo)
  }

  return (
    <EditProfile
      myUserInfo={myUserInfo}
      updateProfilePicture={updatePicture}
      interestOptions={interestOptions}
      handleEditReady={handleEditReady}
    />
  )
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const currentUser = state.entities.users.profiles[currentUserId]
  const userInterests = state.user.interests
  const interestOptions = state.interests.results
  const myUserInfo = state.user

  return {
    mmuserId: currentUserId,
    currentUser,
    userInterests,
    interestOptions,
    myUserInfo,
  }
}

EditProfileContainer.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  interestOptions: PropTypes.instanceOf(Array).isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  mmuserId: PropTypes.string.isRequired,
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUser: updateUserAction,
      uploadProfileImage: uploadProfileImageAction,
      getUser: getUserAction,
      setDefaultProfileImage: setDefaultProfileImageAction,
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(EditProfileContainer, shouldComponentUpdate))
