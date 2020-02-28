import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api/user/user'
import EmailSmsForm from '../components/EmailSmsForm'

const EmailVerificationContainer = props => {
  const { history } = props

  const handleVerifyRequest = async resetInfo => {
    const formattedInfo = {
      email: resetInfo.email.toLowerCase(),
      phoneNumber: resetInfo.phoneNumber,
    }
    const resp = await API.sendVerifyEmailLink(formattedInfo)
    if (resp.success) {
      history.push('/registration-success')
    } else if (resp.message === 'This account is already verified') {
      alert('Sähköposti on jo vahvistettu.')
    } else {
      alert('Sähköpostia ei löytynyt.')
    }
  }

  return (
    <EmailSmsForm
      handleRequest={handleVerifyRequest}
      title="Vahvistuslinkin lähettäminen uudelleen"
      description="Lähetämme sinulle linkin, josta pääset vahvistamaan sähköpostisi."
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
