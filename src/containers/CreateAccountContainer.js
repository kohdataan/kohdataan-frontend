import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import CreateAccount from '../components/CreateAccount'
import * as API from '../api/user/user'

const CreateAccountContainer = props => {
  const { history } = props
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    document.body.className = 'create-account-body'
    return () => {
      document.body.className = ''
    }
  })

  const handleAccountCreation = async (
    firstname,
    lastname,
    birthdate,
    email,
    phoneNumber,
    password
  ) => {
    // Remove empty spaces and potential country code
    // in case of Russia, Estonia or Sweden, store number as 00{code}
    let number = phoneNumber.replace(/ /g, '')
    if (number.startsWith('+358')) {
      number = number.replace('+358', '0')
    } else if (number.startsWith('358')) {
      number = number.replace('358', '0')
    } else if (number.startsWith('00358')) {
      number = number.replace('00358', '0')
    } else if (number.startsWith('+7')) {
      number = number.replace('+', '00')
    } else if (number.startsWith('+372')) {
      number = number.replace('+', '00')
    } else if (number.startsWith('+46')) {
      number = number.replace('+', '00')
    } 
    // create unique username for Mattermost
    // Mattermot username must begin with a letter and contain between 3 and 22 characters
    // including numbers, lowercase letters, and the symbols ".", "-", and "_".

    let username = `${uniqid('-')}`
    if (username.length > 22) {
      username = username.slice(0, 22)
    }

    try {
      const user = {
        first_name: firstname,
        last_name: lastname,
        birthdate,
        email,
        phoneNumber,
        username,
        nickname: 'Käyttäjä',
        password,
      }

      if (user) {
        const res = await API.userSignUp(user)
        if (res && res.success) {
          const emailAddress = { email }
          await API.sendVerifyEmailLink(emailAddress)
          history.push('/registration-success')
        }
        setErrors(res.error)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  return (
    <CreateAccount
      handleAccountCreation={handleAccountCreation}
      apiErrors={errors}
    />
  )
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
