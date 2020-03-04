import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as API from '../api/user/user'
import PasswordResetPage from '../components/PasswordResetPage'

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
        history.push({
          state: {
            textToAdd:
              'Resetointilinkki on joko vanhentunut, käytetty tai väärä.',
          },
        })
      } else {
        history.push({
          pathname: '/login',
          state: { textToAdd: 'Salasana vaihdettu onnistuneesti.'},
        })
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
