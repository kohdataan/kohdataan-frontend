import React, { memo } from 'react'
import LogIn from '../components/LogIn'

const LogInContainer = () => {
  return <LogIn />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  if (localStorage.getItem('authToken')) {
    props.history.push('/profiili')
  }
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(LogInContainer, shouldComponentUpdate)
