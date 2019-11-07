import React, { memo } from 'react'
import ThankYouMessage from '../components/ThankYouMessage'

const ThankYouMessageContainer = () => {
  return <ThankYouMessage />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(ThankYouMessageContainer, shouldComponentUpdate)
