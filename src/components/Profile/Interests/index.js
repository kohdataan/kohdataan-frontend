import React, { useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import InterestsGrid from './InterestsGrid'
import EditInterestsGrid from './EditInterestsGrid'

const Interests = props => {
  const { editProfile, toggleEditProfile } = props
  const [showInterestsGrid, setShowInterestsGrid] = useState(false)
  const handleClick = () => {
    setShowInterestsGrid(!showInterestsGrid)
  }
  const interestList = [
    { key: 'Eläimet', icon: 'fas fa-paw fa-fw' },
    { key: 'Matkustus', icon: 'fas fa-globe-europe fa-fw' },
    { key: 'Urheilu', icon: 'fas fa-volleyball-ball fa-fw' },
    { key: 'Luonto', icon: 'fas fa-tree fa-fw' },
    { key: 'Elokuvat', icon: 'fas fa-film fa-fw' },
    { key: 'Ruoka', icon: 'fas fa-utensils fa-fw' },
    { key: 'Mekaniikka', icon: 'fas fa-cogs fa-fw' },
    { key: 'Musiikki', icon: 'fas fa-music fa-fw' },
    { key: 'Taide', icon: 'fas fa-palette fa-fw' },
  ]
  return (
    <div className="interests-container">
      <h2 className="interests-header">Minua kiinnostaa</h2>
      <p className="interests-text">
        Kerro muille, mistä asioista olet kiinnostunut.
      </p>
      <div className="interests-grid-wrapper">
        {!editProfile && !showInterestsGrid && (
          <ButtonContainer className="interests-button" onClick={handleClick}>
            Kiinnostuksen kohteet
          </ButtonContainer>
        )}
        {editProfile && (
          <>
            <EditInterestsGrid interestList={interestList} />
            <ButtonContainer
              className="interests-ready-button"
              onClick={toggleEditProfile}
            >
              Valmis
            </ButtonContainer>
          </>
        )}
        {showInterestsGrid && !editProfile && (
          <InterestsGrid interestList={interestList} />
        )}
      </div>
    </div>
  )
}

Interests.propTypes = {
  editProfile: propTypes.bool.isRequired,
  toggleEditProfile: propTypes.func.isRequired,
}

export default Interests
