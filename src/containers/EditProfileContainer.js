import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getMe as getMeAction,
  getProfilesByUsernames as getProfilesByUsernamesAction,
  uploadProfileImage as uploadProfileImageAction,
} from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import {
  addUserInterests as addUserInterestsAction,
  getUserInterests as getUserInterestsAction,
  updateUser as updateUserAction,
  addUserToState as addUserToStateAction,
} from '../store/user/userAction'
import getInterestsAction from '../store/interest/interestAction'
import dataUriToBlob from '../utils/dataUriToBlob'
import EditProfile from '../components/EditProfile'

const EditProfileContainer = props => {
  const {
    currentUser,
    username,
    getMe,
    userInterests,
    interestOptions,
    addUserInterests,
    getUserInterests,
    updateUser,
    myUserInfo,
    uploadProfileImage,
  } = props

  const [img, setImg] = useState(null)

  // Get current user mmuser info
  useEffect(() => {
    getMe()
    props.addUserToStateAction()
    props.getInterestsAction()
  }, [])

  // Get current user interests
  useEffect(() => {
    if (!username) {
      getUserInterests()
    }
  }, [currentUser])

  // Update profile picture
  const updateProfilePicture = () => {
    if (currentUser && img) {
      uploadProfileImage(currentUser.id, dataUriToBlob(img))
    }
  }

  return <EditProfile setImg={setImg} />
}

const mapStateToProps = (state, ownProps) => {
  const { currentUserId } = state.entities.users
  const { username } = ownProps.match.params
  const currentUser = state.entities.users.profiles[currentUserId]
  const userInterests = state.user.interests
  const interestOptions = state.interests.results
  const myUserInfo = state.user

  return {
    currentUserId,
    currentUser,
    username,
    userInterests,
    interestOptions,
    myUserInfo,
  }
}

EditProfileContainer.propTypes = {
  getMe: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object),
  username: PropTypes.string,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  userInterests: PropTypes.instanceOf(Array),
  interestOptions: PropTypes.instanceOf(Array),
  getInterestsAction: PropTypes.func.isRequired,
  addUserInterests: PropTypes.func.isRequired,
  getUserInterests: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  addUserToStateAction: PropTypes.func.isRequired,
}

EditProfileContainer.defaultProps = {
  currentUser: {},
  username: '',
  userInterests: [],
  interestOptions: [],
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMe: getMeAction,
      getProfilesByUsernames: getProfilesByUsernamesAction,
      addUserInterests: addUserInterestsAction,
      getUserInterests: getUserInterestsAction,
      updateUser: updateUserAction,
      uploadProfileImage: uploadProfileImageAction,
      getInterestsAction,
      addUserToStateAction,
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(EditProfileContainer, shouldComponentUpdate))
