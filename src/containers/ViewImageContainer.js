import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ViewImage from '../components/Chat/ViewImage'

const ViewImageContainer = props => {
  const { history, match } = props
  return <ViewImage history={history} match={match} />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

ViewImageContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
}

export default memo(ViewImageContainer, shouldComponentUpdate)