import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from 'mattermost-redux/actions/users'
import LogIn from '../components/LogIn'
import * as API from '../api/user'
import { addUserToState } from '../store/user/userAction'

const LogInContainer = props => {
  const { login: matterMostLogin } = props
  const handleLogin = async (email, password) => {
    try {
      const user = { email, password }
      let loginSuccess = false
      await API.userLogin(user).then(res => {
        localStorage.setItem('userId', res.user.id)
        localStorage.setItem('authToken', res.token)
        loginSuccess = true
      })
      if (loginSuccess) {
        await matterMostLogin(email, password)
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
    props.history.push('/registration/info')
  }
  return JSON.stringify(rest) === JSON.stringify(prest)
}

LogInContainer.propTypes = {
  login: PropTypes.func.isRequired,
  addUserToState: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      addUserToState,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(memo(LogInContainer, shouldComponentUpdate))
