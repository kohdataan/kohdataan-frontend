import React, { memo } from 'react'
import PasswordResetPage from '../components/PasswordResetFlow/ResetPage'

const PasswordResetInfoContainer = () => {
  return <PasswordResetPage />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetInfoContainer, shouldComponentUpdate)
