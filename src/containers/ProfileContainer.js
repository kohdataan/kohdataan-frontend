import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { updateUser as updateUserAction } from '../store/user/userAction'
import Profile from '../components/Profile'

const ProfileContainer = props => {
  const { mmuser, userInterests, myUserInfo, updateUser } = props

  return (
    <Profile
      mmuser={mmuser}
      ownProfile
      userInterests={userInterests}
      myUserInfo={myUserInfo}
      updateUser={updateUser}
    />
  )
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const mmuser = state.entities.users.profiles[currentUserId]
  const userInterests = state.user.interests
  const myUserInfo = state.user

  return {
    mmuser,
    userInterests,
    myUserInfo,
  }
}

ProfileContainer.propTypes = {
  mmuser: PropTypes.instanceOf(Object).isRequired,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  userInterests: PropTypes.instanceOf(Array).isRequired,
  updateUser: PropTypes.func.isRequired,
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
