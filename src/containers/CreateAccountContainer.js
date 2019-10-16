import React, { memo } from 'react'
import uniqid from 'uniqid'
import CreateAccount from '../components/CreateAccount'
import * as API from '../api/user'
import InfoPage from '../components/RegistrationFlow/InfoPage'
import RegistrationContainer from './RegistrationContainer'

const CreateAccountContainer = () => {
  const handleAccountCreation = async (
    firstname,
    lastname,
    birthdate,
    email,
    password,
    rulesAccepted
  ) => {
    // create unique username for Mattermost
    // Mattermot username must begin with a letter and contain between 3 and 22 characters
    // including numbers, lowercase letters, and the symbols ".", "-", and "_".
    let username = `${uniqid.process()}`.concat(email.split('@')[0])

    if (username.length > 22) {
      username = username.slice(0, 22)
    }
    try {
      const user = {
        firstname,
        lastname,
        birthdate,
        email,
        username,
        password,
        rulesAccepted,
      }
      if (user.rulesAccepted) {
        await API.userSignUp(user)
      } else {
        console.log('Sinun on hyväksyttävä palvelun säännöt.')
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  return <CreateAccount handleAccountCreation={handleAccountCreation} />
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(CreateAccountContainer, shouldComponentUpdate)
