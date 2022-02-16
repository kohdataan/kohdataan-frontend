import React, { memo } from 'react'
import AccountLocked from '../components/AccountLocked'

const AccountLockedContainer = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userId')
  return <AccountLocked />
}

export default memo(AccountLockedContainer)
