import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadProfileImage as uploadProfileImageAction } from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import { updateUser as updateUserAction } from '../store/user/userAction'
import dataUriToBlob from '../utils/dataUriToBlob'
import EditProfile from '../components/EditProfile'

const EditProfileContainer = props => {
  const {
    history,
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

  const handleEditReady = (
    newDescription,
    newNickname,
    showAge,
    showLocation,
    location
  ) => {
    const newUserInfo = {
      ...myUserInfo,
      mmid: mmuserId,
      description: newDescription,
      nickname: newNickname,
      showAge,
      showLocation,
      location,
    }
    updateUser(newUserInfo)
  }

  return (
    <EditProfile
      history={history}
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
  history: PropTypes.instanceOf(Object).isRequired,
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
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(EditProfileContainer, shouldComponentUpdate))
