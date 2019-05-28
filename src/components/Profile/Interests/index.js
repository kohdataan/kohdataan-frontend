import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import InterestsGrid from './InterestsGrid'
import EditInterestsContainer from '../../EditInterestsContainer'

const Interests = props => {
  const {
    userInterests,
    currentInterestIds,
    setCurrentInterestsIds,
    editProfile,
    handleEditReady,
    interestOptions,
  } = props

  return (
    <div className="interests-container">
      <h2 className="interests-header">Minua kiinnostaa</h2>
      <p className="interests-text">
        Kerro muille, mistä asioista olet kiinnostunut.
      </p>
      <div className="interests-grid-wrapper">
        {editProfile && (
          <>
            <EditInterestsContainer
              options={interestOptions}
              setInterests={setCurrentInterestsIds}
              interests={currentInterestIds}
            />
            <ButtonContainer
              className="interests-ready-button"
              onClick={handleEditReady}
            >
              Tallenna
            </ButtonContainer>
          </>
        )}
        {!editProfile && <InterestsGrid interestList={userInterests} />}
      </div>
    </div>
  )
}

Interests.propTypes = {
  editProfile: propTypes.bool.isRequired,
  handleEditReady: propTypes.func.isRequired,
  userInterests: propTypes.instanceOf(Array).isRequired,
  interestOptions: propTypes.instanceOf(Array).isRequired,
  currentInterestIds: propTypes.instanceOf(Array).isRequired,
  setCurrentInterestsIds: propTypes.func.isRequired,
}

export default memo(Interests)
