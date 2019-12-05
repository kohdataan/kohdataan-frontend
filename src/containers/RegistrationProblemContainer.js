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
    const resp = await API.sendEmail(msg)
    console.log(resp)
    if (resp.ok) {
      props.history.push('/messagesent')
    } else {
      alert('Viestin lähetys ei onnistunut')
    }
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
