import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types'
import RestoreAccount from '../components/RestoreAccount'
import { restoreUserAccount as restoreUserAction } from '../store/user/userAction'
import * as API from '../api/user/user'

const RestoreAccountContainer = props => {
  const { restoreUserAccount, history, mmid } = props

  const handleDeleteUserNow = async () => {
    try {
      const data = { mmid }
      const id = localStorage.getItem('userId')
      const token = localStorage.getItem('authToken')
      const res = await API.deleteUserNow(data, id, token)
      if (res && res.success) {
        localStorage.removeItem('userId')
        localStorage.removeItem('authToken')
        history.push('/')
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  return (
    <RestoreAccount
      handleRestore={restoreUserAccount}
      handleDeleteNow={handleDeleteUserNow}
      history={history}
    />
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      restoreUserAccount: restoreUserAction,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  return {
    user: state.user,
    mmid: currentUserId,
  }
}

RestoreAccountContainer.propTypes = {
  restoreUserAccount: propTypes.func.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
  mmid: propTypes.string.isRequired,
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
