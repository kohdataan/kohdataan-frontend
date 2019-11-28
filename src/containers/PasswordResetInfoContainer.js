import React, { memo } from 'react'
import PasswordResetInfo from '../components/PasswordResetFlow/ResetInfo'

const PasswordResetInfoContainer = () => {
  return <PasswordResetInfo />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetInfoContainer, shouldComponentUpdate)
