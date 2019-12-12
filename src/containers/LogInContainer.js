import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from 'mattermost-redux/actions/users'
import LogIn from '../components/LogIn'
import * as API from '../api/user'

const LogInContainer = props => {
  const { login: matterMostLogin } = props
  const handleLogin = async (email, password) => {
    try {
      const user = { email, password }
      let loginSuccess = false
      const res = await API.userLogin(user)
      if (res) {
        localStorage.setItem('userId', res.user.id)
        localStorage.setItem('authToken', res.token)
        loginSuccess = true
      }
      if (loginSuccess) {
        console.log('mattermost login')
        const mmres = await matterMostLogin(email, password)
        console.log(mmres)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
  return <LogIn handleLogin={handleLogin} />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  if (localStorage.getItem('authToken')) {
    API.getUser(
      localStorage.getItem('userId'),
      localStorage.getItem('authToken')
    ).then(loggedUser => {
      if (loggedUser.profileReady) {
        props.history.push('/me')
      } else {
        props.history.push('/registration/info')
      }
    })
  }
  return JSON.stringify(rest) === JSON.stringify(prest)
}

LogInContainer.propTypes = {
  login: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(memo(LogInContainer, shouldComponentUpdate))
