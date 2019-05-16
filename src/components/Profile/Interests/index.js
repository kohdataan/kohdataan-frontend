import React, { useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import InterestsGrid from './InterestsGrid'
import EditInterestsGrid from './EditInterestsGrid'
import icons from '../../../contants/interestIcons'

const Interests = props => {
  const { userInterests, editProfile, toggleEditProfile } = props
  const [showInterestsGrid, setShowInterestsGrid] = useState(false)
  const handleClick = () => {
    setShowInterestsGrid(!showInterestsGrid)
  }
  const getIcon = name => {
    const iconObject = icons.find(item => item.key === name)
    return iconObject.icon
  }

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
            <EditInterestsGrid interestList={userInterests} />
            <ButtonContainer
              className="interests-ready-button"
              onClick={toggleEditProfile}
            >
              Valmis
            </ButtonContainer>
          </>
        )}
        {showInterestsGrid && !editProfile && (
          <InterestsGrid interestList={userInterests} getIcon={getIcon} />
        )}
      </div>
    </div>
  )
}

Interests.propTypes = {
  editProfile: propTypes.bool.isRequired,
  toggleEditProfile: propTypes.func.isRequired,
  userInterests: propTypes.instanceOf(Array).isRequired,
}

export default Interests
