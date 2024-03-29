import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LogIn from '../components/LogIn'
import {
  userLogin as userLoginAction,
  addUserToState as addUserToStateAction,
} from '../store/user/userAction'
import * as API from '../api/user/user'

const LogInContainer = (props) => {
  const {
    match: {
      params: { uuid },
    },
    userLogin,
    addUserToState,
    user,
    history,
  } = props

  const [uuidValid, setUuidValid] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.body.className = 'create-account-body'
    return () => {
      document.body.className = ''
    }
  })

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      if (user.profileReady) {
        history.push('/')
      } else {
        history.push('/registration/info')
      }
    } else if (uuid) {
      API.verifyEmail({ uuid }).then((response) => {
        if (response.success) {
          setUuidValid(true)
        } else {
          setUuidValid(false)
        }
      })
    }
  }, [user, history, uuid])

  useEffect(() => {
    if (
      user &&
      user.errorMessage &&
      user.errorMessage.indexOf('deactivated') !== -1
    ) {
      history.push('/deactivated')
    }
  }, [user])

  const handleLogin = async (email, password) => {
    if (document.cookie.includes('CookieConsent=true')) {
      const userData = { email, password }
      await userLogin(userData)
      await addUserToState()
    } else {
      setError('cookiesNotAccepted')
    }
    return null
  }

  return (
    <LogIn
      handleLogin={handleLogin}
      user={user}
      uuid={uuidValid}
      error={error}
      textToAdd={history.location.state && history.location.state.textToAdd}
    />
  )
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

LogInContainer.propTypes = {
  match: PropTypes.instanceOf(Object),
  userLogin: PropTypes.func.isRequired,
  addUserToState: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  textToAdd: PropTypes.string,
}

LogInContainer.defaultProps = {
  match: null,
  textToAdd: null,
}

const mapStateToProps = (state) => {
  const { user } = state
  return {
    user,
  }
}

const mapDispatchToProps = (dispatch) =>
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
