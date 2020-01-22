import React, { memo } from 'react'
// import { Link } from 'react-router-dom'
// import * as API from '../../api/user/user'
// import handleLogout from '../../utils/userLogout'
import './styles.scss'

const AccountLocked = () => {
  return (
    <div className="account-locked-container">
      <h1 className="account-locked-text">Kohdataan</h1>
      <h3>
        Näyttäisi, että käyttäjätilisi on tällä hetkellä pois käytöstä. Voit
        yrittää kirjautua sisään myöhemmin uudestaan.
      </h3>
    </div>
  )
}

export default memo(AccountLocked)
