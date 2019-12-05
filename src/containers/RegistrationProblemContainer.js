import React, { memo } from 'react'
import PropTypes from 'prop-types'
import RegistrationProblem from '../components/RegistrationProblem'
import * as API from '../api/user'

const RegistrationProblemContainer = props => {
  const handleEmailSending = async (name, email, message) => {
    const msg = {
      name,
      email,
      message,
    }
    await API.sendEmail(msg)
    props.history.push('/messagesent')
  }
  return <RegistrationProblem handleEmailSending={handleEmailSending} />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}
RegistrationProblemContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

export default memo(RegistrationProblemContainer, shouldComponentUpdate)
