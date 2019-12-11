import React, { useState, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getProfilesByUsernames as getProfilesByUsernamesAction,
  uploadProfileImage as uploadProfileImageAction,
} from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import {
  addUserInterests as addUserInterestsAction,
  updateUser as updateUserAction,
} from '../store/user/userAction'
import getInterestsAction from '../store/interest/interestAction'
import dataUriToBlob from '../utils/dataUriToBlob'
import EditInterests from '../components/EditInterests'

const EditInterestsContainer = props => {
  const {
    currentUser,
    username,
    userInterests,
    interestOptions,
    addUserInterests,
    getUserInterests,
    updateUser,
    myUserInfo,
    uploadProfileImage,
  } = props

  const [img, setImg] = useState(null)

  // Update profile picture
  const updateProfilePicture = () => {
    if (currentUser && img) {
      uploadProfileImage(currentUser.id, dataUriToBlob(img))
    }
  }

  return <EditInterests />
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

EditInterestsContainer.propTypes = {
  currentUser: PropTypes.instanceOf(Object),
  username: PropTypes.string,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  userInterests: PropTypes.instanceOf(Array),
  interestOptions: PropTypes.instanceOf(Array),
  addUserInterests: PropTypes.func.isRequired,
  getUserInterests: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
}

EditInterestsContainer.defaultProps = {
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
      getProfilesByUsernames: getProfilesByUsernamesAction,
      addUserInterests: addUserInterestsAction,
      updateUser: updateUserAction,
      uploadProfileImage: uploadProfileImageAction,
      getInterestsAction,
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(EditInterestsContainer, shouldComponentUpdate))
