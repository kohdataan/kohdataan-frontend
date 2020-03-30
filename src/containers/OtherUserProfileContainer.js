import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProfilesByUsernames as getProfilesByUsernamesAction } from 'mattermost-redux/actions/users'
import { createDirectChannel as createDirectChannelAction } from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import { getInterestsByUsername, getUserByUsername } from '../api/user/user'
import Profile from '../components/Profile'

const OtherUserProfileContainer = props => {
  // mattermost user
  const {
    currentUser,
    username,
    getProfilesByUsernames,
    history,
    createDirectChannel,
    currentUserId,
  } = props

  const [mmuser, setmmUser] = useState({})
  const [interests, setInterests] = useState([])
  const [otherUserInfo, setOtherUserInfo] = useState([])

  const startDirectChannel = async () => {
    const newChannel = await createDirectChannel(currentUser.id, mmuser.id)
    history.push(`/chat/${newChannel.data.id}`)
  }

  // If username is given, get other user's info
  useEffect(() => {
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
    if (username) {
      getProfilesByUsernames([username])
        .then(data => setmmUser(data.data[0]))
        // eslint-disable-next-line no-console
        .catch(e => console.error(e))
      // TODO: Get other users info from node backend (location, description)
      fetchOtherUser()
    }
  }, [username, getProfilesByUsernames])

  return (
    <Profile
      mmuser={mmuser}
      userInterests={interests}
      myUserInfo={otherUserInfo}
      startDirectChannel={startDirectChannel}
      history={history}
      currentUserId={currentUserId}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { currentUserId } = state.entities.users
  const { username } = ownProps.match.params
  const currentUser = state.entities.users.profiles[currentUserId]
  const interestOptions = state.interests.results

  return {
    currentUserId,
    currentUser,
    username,
    interestOptions,
  }
}

OtherUserProfileContainer.propTypes = {
  currentUser: PropTypes.instanceOf(Object),
  username: PropTypes.string,
  getProfilesByUsernames: PropTypes.func.isRequired,
  createDirectChannel: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string.isRequired,
}

OtherUserProfileContainer.defaultProps = {
  currentUser: {},
  username: '',
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
      createDirectChannel: createDirectChannelAction,
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(OtherUserProfileContainer, shouldComponentUpdate))
