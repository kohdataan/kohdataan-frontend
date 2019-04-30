import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const EditInterestsGrid = props => {
  const { interestList } = props
  return (
    <div className="interests-grid">
      {interestList.map(interest => (
        <span key={interest.key} className="interests-grid-edit-item">
          <i
            aria-hidden="true"
            className={interest.icon}
            title={interest.key}
          />
          <span className="interests-grid-label">{interest.key}</span>
        </span>
      ))}
    </div>
  )
}

EditInterestsGrid.propTypes = {
  interestList: propTypes.instanceOf(Array).isRequired,
}

export default EditInterestsGrid
