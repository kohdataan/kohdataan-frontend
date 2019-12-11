import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Profile from '../components/Profile'

const ProfileContainer = props => {
  const { mmuser, userInterests, interestOptions, myUserInfo } = props

  return (
    <Profile
      user={mmuser}
      ownProfile
      userInterests={userInterests}
      interestOptions={interestOptions}
      myUserInfo={myUserInfo}
    />
  )
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const mmuser = state.entities.users.profiles[currentUserId]
  const userInterests = state.user.interests
  const interestOptions = state.interests.results
  const myUserInfo = state.user

  return {
    mmuser,
    userInterests,
    interestOptions,
    myUserInfo,
  }
}

ProfileContainer.propTypes = {
  mmuser: PropTypes.instanceOf(Object).isRequired,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  userInterests: PropTypes.instanceOf(Array),
  interestOptions: PropTypes.instanceOf(Array),
}

ProfileContainer.defaultProps = {
  userInterests: [],
  interestOptions: [],
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ProfileContainer, shouldComponentUpdate))
