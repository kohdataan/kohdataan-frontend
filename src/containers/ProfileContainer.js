import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { updateUser as updateUserAction } from '../store/user/userAction'
import Profile from '../components/Profile'

const ProfileContainer = props => {
  const {
    currentUserId,
    mmuser,
    userInterests,
    myUserInfo,
    updateUser,
    history,
  } = props

  if (myUserInfo && !myUserInfo.profileReady) history.push('/registration/info')

  return (
    <Profile
      currentUserId={currentUserId}
      mmuser={mmuser}
      ownProfile
      userInterests={userInterests}
      myUserInfo={myUserInfo}
      updateUser={updateUser}
      history={history}
    />
  )
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const mmuser = state.entities.users.profiles[currentUserId]
  const userInterests = state.user.interests
  const myUserInfo = state.user
  return {
    currentUserId,
    mmuser,
    userInterests,
    myUserInfo,
  }
}

ProfileContainer.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  mmuser: PropTypes.instanceOf(Object).isRequired,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  userInterests: PropTypes.instanceOf(Array),
  updateUser: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object),
}

ProfileContainer.defaultProps = {
  userInterests: [],
  history: null,
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUser: updateUserAction,
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ProfileContainer, shouldComponentUpdate))
