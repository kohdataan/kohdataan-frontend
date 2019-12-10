import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getMe as getMeAction,
  getProfilesByUsernames as getProfilesByUsernamesAction,
} from 'mattermost-redux/actions/users'
import { createDirectChannel as createDirectChannelAction } from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import {
  addUserInterests as addUserInterestsAction,
  getUserInterests as getUserInterestsAction,
  addUserToState as addUserToStateAction,
} from '../store/user/userAction'
import getInterestsAction from '../store/interest/interestAction'
import { getInterestsByUsername, getUserByUsername } from '../api/user'
import Profile from '../components/Profile'

const OtherUserProfileContainer = props => {
  // mattermost user
  const {
    currentUser,
    username,
    getProfilesByUsernames,
    getMe,
    userInterests,
    interestOptions,
    addUserInterests,
    myUserInfo,
    history,
    createDirectChannel,
  } = props
  const [mmuser, setmmUser] = useState({})
  const [interests, setInterests] = useState([])
  const [otherUserInfo, setOtherUserInfo] = useState([])

  // TODO: Get other user's interests for other user profile
  useEffect(() => {
    getMe()
    props.addUserToStateAction()
    props.getInterestsAction()
  }, [])

  const fetchOtherUser = async () => {
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

  const startDirectChannel = async () => {
    const newChannel = await createDirectChannel(currentUser.id, mmuser.id)
    history.push(`/chat/${newChannel.data.id}`)
  }

  return (
    <Profile
      user={currentUser}
      currentUser={currentUser}
      userInterests={userInterests}
      interestOptions={interestOptions}
      addUserInterests={addUserInterests}
      myUserInfo={myUserInfo}
      startDirectChannel={startDirectChannel}
      interests={interests}
      otherUserInfo={otherUserInfo}
    />
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

OtherUserProfileContainer.propTypes = {
  getMe: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object),
  username: PropTypes.string,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  getProfilesByUsernames: PropTypes.func.isRequired,
  userInterests: PropTypes.instanceOf(Array),
  interestOptions: PropTypes.instanceOf(Array),
  getInterestsAction: PropTypes.func.isRequired,
  addUserInterests: PropTypes.func.isRequired,
  createDirectChannel: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  addUserToStateAction: PropTypes.func.isRequired,
}

OtherUserProfileContainer.defaultProps = {
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
      createDirectChannel: createDirectChannelAction,
      getInterestsAction,
      addUserToStateAction,
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(OtherUserProfileContainer, shouldComponentUpdate))
