import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createDirectChannel as createDirectChannelAction } from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import {
  getInterestsByUsername,
  getUserByUsername,
  getMmProfiles,
} from '../api/user/user'
import Profile from '../components/Profile'

const OtherUserProfileContainer = props => {
  // mattermost user
  const {
    currentUser,
    username,
    history,
    createDirectChannel,
    currentUserId,
  } = props

  const [mmuser, setmmUser] = useState({})
  const [interests, setInterests] = useState([])
  const [otherUserInfo, setOtherUserInfo] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const getProfiles = async () => {
      const res = await getMmProfiles(
        currentUser.id,
        localStorage.getItem('authToken')
      )
      if (res && res.userDetails) {
        const filteredProfiles = res.userDetails
        setProfiles(filteredProfiles)
      }
    }
    getProfiles()
  }, [])
  const startDirectChannel = async () => {
    const newChannel = await createDirectChannel(currentUser.id, mmuser.id)
    if (newChannel && newChannel.data && newChannel.data.id)
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
    if (username && profiles) {
      const foundMmUser = Object.values(profiles).find(
        p => p.username === username
      )
      setmmUser(foundMmUser)
      fetchOtherUser()
    }
  }, [username, profiles, getUserByUsername])

  return (
    <>
      {profiles && mmuser ? (
        <Profile
          mmuser={mmuser}
          userInterests={interests}
          myUserInfo={otherUserInfo}
          startDirectChannel={startDirectChannel}
          history={history}
          currentUserId={currentUserId}
        />
      ) : (
        <></>
      )}
    </>
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
      createDirectChannel: createDirectChannelAction,
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(OtherUserProfileContainer, shouldComponentUpdate))
