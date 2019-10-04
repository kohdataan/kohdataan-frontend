import React, { memo } from 'react'
import PasswordReset from '../components/PasswordReset'

const PasswordResetContainer = () => {
  return <PasswordReset />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetContainer, shouldComponentUpdate)
