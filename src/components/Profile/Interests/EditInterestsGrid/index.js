import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../../ButtonContainer'

const EditInterestsGrid = props => {
  const { interestList } = props
  return (
    <div className="interests-grid">
      {interestList.map(interest => (
        <ButtonContainer
          key={interest.key}
          className="interests-grid-edit-button interests-grid-edit-item"
          onClick={() => console.log(`clicked ${interest.key}`)}
        >
          <i
            aria-hidden="true"
            className={interest.icon}
            title={interest.key}
          />
          <span className="interests-grid-label">{interest.key}</span>
        </ButtonContainer>
      ))}
    </div>
  )
}

EditInterestsGrid.propTypes = {
  interestList: propTypes.instanceOf(Array).isRequired,
}

export default EditInterestsGrid
