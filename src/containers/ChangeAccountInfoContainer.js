import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { logout } from 'mattermost-redux/actions/users'
import Account from '../components/Account'
import {
  updateUser as updateUserAction,
  updateUserPassword as updateUserPasswordAction,
} from '../store/user/userAction'
import logoutHandler from '../utils/userLogout'
import * as API from '../api/user/user'

const ChangeAccountInfoContainer = (props) => {
  const {
    myUserInfo,
    currentUser,
    updateUser,
    updatePassword,
    history,
    logout: matterMostLogout,
  } = props

  const handleLogout = () => logoutHandler(API.userLogout, matterMostLogout)

  return (
    <Account
      nodeUser={myUserInfo}
      mmuser={currentUser}
      updateUser={updateUser}
      updatePassword={updatePassword}
      history={history}
      userLogout={handleLogout}
    />
  )
}

const mapStateToProps = (state) => {
  const { currentUserId } = state.entities.users
  const currentUser = state.entities.users.profiles[currentUserId]
  const userInterests = state.user.interests
  const myUserInfo = state.user

  return {
    mmuserId: currentUserId,
    currentUser,
    userInterests,
    myUserInfo,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUser: updateUserAction,
      updatePassword: updateUserPasswordAction,
      logout,
    },
    dispatch
  )

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

ChangeAccountInfoContainer.propTypes = {
  myUserInfo: PropTypes.shape({ id: PropTypes.number }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ChangeAccountInfoContainer, shouldComponentUpdate))
