import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api/user'
import ResetRequest from '../components/PasswordResetFlow/ResetRequest'

const PasswordResetRequestContainer = props => {
  const { history } = props

  const handleReset = async resetInfo => {
    await API.resetPassword(resetInfo).then(resp => {
      console.log('resp', resp)
      if (resp.success) {
        history.push('/reset-password-info')
      } else {
        alert('Sähköpostia ei löytynyt')
      }
    })
  }

  return <ResetRequest handleReset={handleReset} />
}

PasswordResetRequestContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetRequestContainer, shouldComponentUpdate)
