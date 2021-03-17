import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types'
import { logout } from 'mattermost-redux/actions/users'
import RestoreAccount from '../components/RestoreAccount'
import { restoreUserAccount as restoreUserAction } from '../store/user/userAction'
import * as API from '../api/user/user'
import logoutHandler from '../utils/userLogout'

const RestoreAccountContainer = (props) => {
  const { restoreUserAccount, mmid, matterMostLogout } = props

  const handleLogout = () => logoutHandler(API.userLogout, matterMostLogout)

  const handleDeleteUserNow = async () => {
    try {
      // Get user data and token from local storage before logging out
      const data = { mmid }
      const id = localStorage.getItem('userId')
      const token = localStorage.getItem('authToken')
      // First logout user (while it still exists)
      handleLogout()
      // Then delete the user permanently
      API.deleteUserNow(data, id, token)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  const handleRestore = async () => {
    const data = { mmid }
    restoreUserAccount(data)
  }

  return (
    <RestoreAccount
      handleRestore={handleRestore}
      handleDeleteNow={handleDeleteUserNow}
    />
  )
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      restoreUserAccount: restoreUserAction,
      matterMostLogout: logout,
    },
    dispatch
  )

const mapStateToProps = (state) => {
  const { currentUserId } = state.entities.users
  return {
    user: state.user,
    mmid: currentUserId,
  }
}

RestoreAccountContainer.propTypes = {
  restoreUserAccount: propTypes.func.isRequired,
  mmid: propTypes.string.isRequired,
  matterMostLogout: propTypes.func.isRequired,
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(RestoreAccountContainer, shouldComponentUpdate))
)
