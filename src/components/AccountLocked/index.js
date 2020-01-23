import React, { memo, useEffect } from 'react'
import './styles.scss'

const AccountLocked = () => {
  useEffect(() => {
    localStorage.removeItem('userId')
    localStorage.removeItem('authToken')
  })

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
