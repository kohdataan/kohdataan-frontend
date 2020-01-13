import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api/user/user'
import PasswordResetPage from '../components/PasswordResetFlow/ResetPage'

const PasswordResetPageContainer = props => {
  const {
    match: {
      params: { uuid },
    },
    history,
  } = props

  const handleNewPassword = async password => {
    const data = { uuid, password: password.password }
    await API.setNewPassword(data).then(resp => {
      if (!resp.success) {
        alert('Resetointilinkki on joko vanhentunut, käytetty tai väärä.')
      } else {
        alert('Salasana vaihdettu onnistuneesti.')
        history.push('/')
      }
    })
  }

  return <PasswordResetPage handleNewPassword={handleNewPassword} />
}

PasswordResetPageContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetPageContainer, shouldComponentUpdate)
