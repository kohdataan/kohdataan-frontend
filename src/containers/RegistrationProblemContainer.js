import React, { memo } from 'react'
import RegistrationProblem from '../components/RegistrationProblem'

const RegistrationProblemContainer = () => {
  return <RegistrationProblem />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(RegistrationProblemContainer, shouldComponentUpdate)