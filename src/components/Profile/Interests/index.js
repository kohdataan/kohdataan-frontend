import React from 'react'
import './styles.scss'

const Interests = () => {
  return (
    <div>
      <h2 className="interests-header">Minua kiinnostaa</h2>
      <div className="interests-text">
        Kerro muille, mistä asioista olet kiinnostunut.
      </div>
      <div className="centered-div">
        <button type="button" className="interests-button">
          Kiinnostuksen kohteet
        </button>
      </div>
    </div>
  )
}

export default Interests
