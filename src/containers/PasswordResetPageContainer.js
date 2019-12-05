import React, { memo } from 'react'
import PropTypes from 'prop-types'
import PasswordResetPage from '../components/PasswordResetFlow/ResetPage'

const PasswordResetPageContainer = props => {
  const {
    match: {
      params: { uuid },
    },
  } = props

  return <PasswordResetPage />
}

PasswordResetPageContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetPageContainer, shouldComponentUpdate)
