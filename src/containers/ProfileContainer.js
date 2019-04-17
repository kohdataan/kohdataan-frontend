import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadMe, getMe } from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import Profile from '../components/Profile'

const ProfileContainer = props => {
  const { user } = props || {}
  useEffect(() => {
    props.getMe()
  }, [])

  return <Profile user={user} />
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users

  return {
    currentUserId,
    user: state.entities.users.profiles[currentUserId],
  }
}

ProfileContainer.propTypes = {
  getMe: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadMe,
      getMe,
    },
    dispatch
  )

// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
