import React, { memo } from 'react'
import RegistrationSuccessMessage from '../components/RegistrationSuccessMessage'

const RegistrationSuccessContainer = () => {
  return <RegistrationSuccessMessage />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(RegistrationSuccessContainer, shouldComponentUpdate)
