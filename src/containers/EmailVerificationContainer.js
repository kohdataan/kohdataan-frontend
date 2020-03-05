import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api/user/user'
import EmailSmsForm from '../components/EmailSmsForm'

const EmailVerificationContainer = props => {
  const { history } = props
  const [apiError, setApiError] = useState(false)
  const [text, setText] = useState('')

  const handleVerifyRequest = async resetInfo => {
    const formattedInfo = {
      email: resetInfo.toLowerCase(),
      phoneNumber: '',
    }
    const resp = await API.sendVerifyEmailLink(formattedInfo)
    if (resp.success) {
      history.push('/registration-success')
    } else if (resp.message === 'This account is already verified') {
      setText('Sähköposti on jo vahvistettu.')
      setApiError(true)
    } else {
      setText('')
      setApiError(true)
    }
  }

  return (
    <EmailSmsForm
      handleRequest={handleVerifyRequest}
      title="Vahvistuslinkin lähettäminen uudelleen"
      pagePurpose="verifyEmail"
      apiError={apiError}
      setApiError={setApiError}
      text={text}
      setText={setText}
    />
  )
}

EmailVerificationContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(EmailVerificationContainer, shouldComponentUpdate)
