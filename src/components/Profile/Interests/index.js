import React from 'react'
import './styles.scss'
import ButtonContainer from '../../ButtonContainer'

const Interests = () => {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <h2 className="interests-header">Minua kiinnostaa</h2>
      <div className="interests-text">
        Kerro muille, mistä asioista olet kiinnostunut.
      </div>
      <div className="centered-div">
        <ButtonContainer className="interests-button" onClick={handleClick}>
          Kiinnostuksen kohteet
        </ButtonContainer>
      </div>
    </div>
  )
}

export default Interests
