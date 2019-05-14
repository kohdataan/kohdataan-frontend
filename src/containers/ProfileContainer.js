import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getMe as getMeAction,
  getProfilesByUsernames as getProfilesByUsernamesAction,
} from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import Profile from '../components/Profile'

const ProfileContainer = props => {
  const { currentUser, username, getProfilesByUsernames, getMe } = props
  const [user, setUser] = useState({})

  useEffect(() => {
    getMe()
  }, [])
  useEffect(() => {
    if (username) {
      getProfilesByUsernames([username]).then(data => setUser(data.data[0]))
    } else {
      setUser(currentUser)
    }
  }, [username, currentUser])

  return <Profile user={user} currentUser={currentUser} />
}

const mapStateToProps = (state, ownProps) => {
  const { currentUserId } = state.entities.users
  const { username } = ownProps.match.params
  const currentUser = state.entities.users.profiles[currentUserId]

  return {
    currentUserId,
    currentUser,
    username,
  }
}

ProfileContainer.propTypes = {
  getMe: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object),
  username: PropTypes.string,
  getProfilesByUsernames: PropTypes.func.isRequired,
}

ProfileContainer.defaultProps = {
  currentUser: {},
  username: '',
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMe: getMeAction,
      getProfilesByUsernames: getProfilesByUsernamesAction,
    },
    dispatch
  )

// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
