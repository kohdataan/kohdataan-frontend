import React, { memo } from 'react'
import propTypes from 'prop-types'
import ServiceRules from '../components/ServiceRules'

const ServiceRulesContainer = ({ setRulesAccepted }) => {
  return <ServiceRules setRulesAccepted={setRulesAccepted} />
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

ServiceRulesContainer.propTypes = {
  setRulesAccepted: propTypes.func.isRequired,
}

export default memo(ServiceRulesContainer, shouldComponentUpdate)
