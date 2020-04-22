import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import RegistrationProblem from '../components/RegistrationProblem'
import * as API from '../api/user/user'

const RegistrationProblemContainer = props => {
  const { handleClick, history } = props
  const [text, setText] = useState('')
  const handleEmailSending = async (name, email, message, type) => {
    const msg = {
      name,
      email,
      message,
      type,
    }
    const resp = await API.sendEmail(msg)
    if (resp && resp.success && !handleClick) {
      history.push('/messagesent')
    } else if (handleClick) {
      setText('Kiitos viestistä.')
    } else {
      setText('Viestin lähetys ei onnistunut')
    }
  }
  return (
    <RegistrationProblem
      handleEmailSending={handleEmailSending}
      handleClick={handleClick}
      text={text}
    />
  )
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}
RegistrationProblemContainer.propTypes = {
  history: PropTypes.instanceOf(Object),
  handleClick: PropTypes.func,
}

RegistrationProblemContainer.defaultProps = {
  history: null,
  handleClick: null,
}

export default memo(RegistrationProblemContainer, shouldComponentUpdate)
