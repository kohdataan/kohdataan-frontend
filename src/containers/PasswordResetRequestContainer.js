import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api/user/user'
import EmailSmsForm from '../components/EmailSmsForm'

const PasswordResetRequestContainer = props => {
  const { history } = props
  const [apiError, setApiError] = useState(false)

  const handleResetRequest = async resetInfo => {
    const infoToSend = { email: resetInfo, phoneNumber: '' }
    const resp = await API.resetPassword(infoToSend)
    if (resp.success) {
      history.push('/reset-password-info')
    } else {
      setApiError(true)
    }
  }

  return (
    <EmailSmsForm
      title="Salasanan vaihtaminen"
      pagePurpose="changePassword"
      handleRequest={handleResetRequest}
      apiError={apiError}
      setApiError={setApiError}
    />
  )
}

PasswordResetRequestContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetRequestContainer, shouldComponentUpdate)
