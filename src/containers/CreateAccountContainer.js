import React, { memo } from 'react'
import CreateAccount from '../components/CreateAccount'

const CreateAccountContainer = () => {
  return <CreateAccount />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(CreateAccountContainer, shouldComponentUpdate)
