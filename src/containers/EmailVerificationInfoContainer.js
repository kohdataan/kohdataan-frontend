import React, { memo } from 'react'
import VerificationInfo from '../components/EmailVerificationFlow/VerificationInfo'

const PasswordResetInfoContainer = () => {
  return <VerificationInfo />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetInfoContainer, shouldComponentUpdate)
