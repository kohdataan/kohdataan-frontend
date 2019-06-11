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
} from '../store/user/userAction'
import getInterestsAction from '../store/interest/interestAction'
import { getInterestsByUsername, getUserByUsername } from '../api/user'
import Profile from '../components/Profile'
import dataUriToBlob from '../utils/dataUriToBlob'

const ProfileContainer = props => {
  // mattermost user
  const {
    currentUser,
    username,
    getProfilesByUsernames,
    getMe,
    userInterests,
    interestOptions,
    addUserInterests,
    getUserInterests,
    updateUser,
    myUserInfo,
    uploadProfileImage,
  } = props
  const [mmuser, setmmUser] = useState({})
  const [interests, setInterests] = useState([])
  const [otherUserInfo, setOtherUserInfo] = useState([])
  const [img, setImg] = useState(null)

  // TODO: Get other user's interests for other user profile
  useEffect(() => {
    getMe()
    props.getInterestsAction()
  }, [])

  async function fetchOtherUser() {
    try {
      const res = await getInterestsByUsername(
        localStorage.getItem('authToken'),
        username
      )
      if (res.result[0]) {
        const data = res.result[0].interests
        setInterests(data)
      }
      const userInfo = await getUserByUsername(
        username,
        localStorage.getItem('authToken')
      )
      if (userInfo) {
        setOtherUserInfo(userInfo)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
  // If username is given, get other user's info
  useEffect(() => {
    if (username) {
      getProfilesByUsernames([username])
        .then(data => setmmUser(data.data[0]))
        // eslint-disable-next-line no-console
        .catch(e => console.error(e))
      // TODO: Get other users info from node backend (location, description)
      fetchOtherUser()
    }
  }, [username])

  // If no username is given, get current user interests
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

  return (
    <>
      {!username && (
        <Profile
          user={currentUser}
          currentUser={currentUser}
          userInterests={userInterests}
          interestOptions={interestOptions}
          addUserInterests={addUserInterests}
          myUserInfo={myUserInfo}
          updateUser={updateUser}
          setImg={setImg}
          updateProfilePicture={updateProfilePicture}
        />
      )}
      {username && otherUserInfo && mmuser && interests && (
        <Profile
          user={mmuser}
          userInterests={interests}
          interestOptions={interestOptions}
          myUserInfo={otherUserInfo}
        />
      )}
    </>
  )
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

ProfileContainer.propTypes = {
  getMe: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object),
  username: PropTypes.string,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  getProfilesByUsernames: PropTypes.func.isRequired,
  userInterests: PropTypes.instanceOf(Array),
  interestOptions: PropTypes.instanceOf(Array),
  getInterestsAction: PropTypes.func.isRequired,
  addUserInterests: PropTypes.func.isRequired,
  getUserInterests: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
}

ProfileContainer.defaultProps = {
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
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ProfileContainer, shouldComponentUpdate))
