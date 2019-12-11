import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadProfileImage as uploadProfileImageAction } from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import {
  addUserInterests as addUserInterestsAction,
  updateUser as updateUserAction,
} from '../store/user/userAction'
import dataUriToBlob from '../utils/dataUriToBlob'
import EditProfile from '../components/EditProfile'

const EditProfileContainer = props => {
  const {
    currentUser,
    userInterests,
    interestOptions,
    addUserInterests,
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

  return (
    <EditProfile
      myUserInfo={myUserInfo}
      updateUser={updateUser}
      updateProfilePicture={updatePicture}
      userInterests={userInterests}
      addUserInterests={addUserInterests}
      interestOptions={interestOptions}
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
    currentUserId,
    currentUser,
    userInterests,
    interestOptions,
    myUserInfo,
  }
}

EditProfileContainer.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
  myUserInfo: PropTypes.instanceOf(Object).isRequired.isRequired,
  userInterests: PropTypes.instanceOf(Array).isRequired,
  interestOptions: PropTypes.instanceOf(Array).isRequired,
  addUserInterests: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addUserInterests: addUserInterestsAction,
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
