import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getMe as getMeAction,
  getProfilesByUsernames as getProfilesByUsernamesAction,
} from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import { addUserInterests, getUserInterests } from '../store/user/userAction'
import Profile from '../components/Profile'

const ProfileContainer = props => {
  // mattermost user
  const {
    currentUser,
    username,
    getProfilesByUsernames,
    getMe,
    userInterests,
  } = props
  const [user, setUser] = useState({})
  // TODO: Get other user's interests for other user profile
  const [interests, setInterests] = useState([])

  useEffect(() => {
    getMe()
  }, [])

  useEffect(() => {
    if (username) {
      getProfilesByUsernames([username]).then(data => setUser(data.data[0]))
      // TODO: Get other users interests
    } else {
      setUser(currentUser)
      props.getUserInterests()
      setInterests(userInterests)
    }
  }, [username, currentUser, userInterests])

  return (
    <Profile user={user} currentUser={currentUser} userInterests={interests} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { currentUserId } = state.entities.users
  const { username } = ownProps.match.params
  const currentUser = state.entities.users.profiles[currentUserId]
  const userInterests = state.user.Interest

  return {
    currentUserId,
    currentUser,
    username,
    userInterests,
  }
}

ProfileContainer.propTypes = {
  getMe: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object),
  username: PropTypes.string,
  getProfilesByUsernames: PropTypes.func.isRequired,
  userInterests: PropTypes.instanceOf(Array),
  getUserInterests: PropTypes.func.isRequired,
}

ProfileContainer.defaultProps = {
  currentUser: {},
  username: '',
  userInterests: [],
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMe: getMeAction,
      getProfilesByUsernames: getProfilesByUsernamesAction,
      addUserInterests,
      getUserInterests,
    },
    dispatch
  )

// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
