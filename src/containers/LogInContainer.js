import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LogIn from '../components/LogIn'
import {
  userLogin as userLoginAction,
  addUserToState as addUserToStateAction,
} from '../store/user/userAction'

const LogInContainer = props => {
  const { userLogin, addUserToState, user, history } = props

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      if (user.profileReady) {
        history.push('/')
      } else {
        history.push('/registration/info')
      }
    }
  }, [user, history])

  const handleLogin = async (email, password) => {
    const userData = { email, password }
    await userLogin(userData)
    await addUserToState()
  }

  return <LogIn handleLogin={handleLogin} user={user} />
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

LogInContainer.propTypes = {
  userLogin: PropTypes.func.isRequired,
  addUserToState: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = state => {
  const { user } = state
  return {
    user,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogin: userLoginAction,
      addUserToState: addUserToStateAction,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(LogInContainer, shouldComponentUpdate))
