import React from 'react'
import './styles.scss'
import ButtonContainer from '../../ButtonContainer'

const Interests = () => {
  return (
    <div>
      <h2 className="interests-header">Minua kiinnostaa</h2>
      <div className="interests-text">
        Kerro muille, mistä asioista olet kiinnostunut.
      </div>
      <div className="centered-div">
        <ButtonContainer className="interests-button">
          Kiinnostuksen kohteet
        </ButtonContainer>
      </div>
    </div>
  )
}

export default Interests
