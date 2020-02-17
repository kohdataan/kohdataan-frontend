import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api/user/user'
import EmailSmsForm from '../components/EmailSmsForm'

const PasswordResetRequestContainer = props => {
  const { history } = props

  const handleResetRequest = async resetInfo => {
    const resp = await API.resetPassword(resetInfo)
    if (resp.success) {
      history.push('/reset-password-info')
    } else {
      alert('Sähköpostia ei löytynyt.')
    }
  }

  return (
    <EmailSmsForm
      handleRequest={handleResetRequest}
      title="Salasanan palautus"
      description="Lähetämme sinulle linkin, josta pääset vaihtamaan unohtuneen salasanan."
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
