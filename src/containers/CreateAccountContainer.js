import React, { memo } from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import CreateAccount from '../components/CreateAccount'
import * as API from '../api/user'

const CreateAccountContainer = props => {
  const { history } = props
  const handleAccountCreation = async (
    firstname,
    lastname,
    birthdate,
    email,
    phoneNumber,
    password
  ) => {
    // Remove empty spaces and potential country code
    let number = phoneNumber.replace(/ /g, '')
    if (number.startsWith('+358')) {
      number = number.replace('+358', '0')
    } else if (number.startsWith('358')) {
      number = number.replace('358', '0')
    } else if (number.startsWith('00358')) {
      number = number.replace('00358', '0')
    }
    // create unique username for Mattermost
    // Mattermot username must begin with a letter and contain between 3 and 22 characters
    // including numbers, lowercase letters, and the symbols ".", "-", and "_".

    let username = `${uniqid.process()}`.concat(email.split('@')[0])
    if (username.length > 22) {
      username = username.slice(0, 22)
    }
    let nickname = username
    try {
      const user = {
        firstname,
        lastname,
        birthdate,
        email,
        phoneNumber,
        username,
        nickname,
        password,
      }
      if (user) {
        await API.userSignUp(user)
        history.push('/registration-success')
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

CreateAccountContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

export default memo(CreateAccountContainer, shouldComponentUpdate)
