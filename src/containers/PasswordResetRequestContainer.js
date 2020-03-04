import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api/user/user'
import EmailSmsForm from '../components/EmailSmsForm'

const PasswordResetRequestContainer = props => {
  const { history } = props

  const handleResetRequest = async resetInfo => {
    const formattedInfo = {
      email: resetInfo.email.toLowerCase(),
      phoneNumber: resetInfo.phoneNumber,
    }
    const resp = await API.resetPassword(formattedInfo)
    if (resp.success) {
      history.push('/reset-password-info')
    } else {
      alert('Tarkista sähköposti.')
    }
  }

  return (
    <EmailSmsForm
      handleRequest={handleResetRequest}
      title="Salasanan vaihtaminen"
      pagePurpose="changePassword"
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
