import React, { memo } from 'react'
import EmailRequestInfo from '../components/EmailSmsInfo'

const PasswordResetInfoContainer = () => {
  return <EmailRequestInfo />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetInfoContainer, shouldComponentUpdate)
