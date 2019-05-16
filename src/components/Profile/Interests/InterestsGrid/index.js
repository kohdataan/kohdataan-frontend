import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const InterestsGrid = props => {
  const { interestList, getIcon } = props
  return (
    <div className="interests-grid">
      {interestList.map(interest => (
        <span key={interest.name} className="interests-grid-item">
          <i
            aria-hidden="true"
            className={getIcon(interest.name)}
            title={interest.name}
          />
          <span className="interests-grid-label">{interest.name}</span>
        </span>
      ))}
    </div>
  )
}

InterestsGrid.propTypes = {
  interestList: propTypes.instanceOf(Array).isRequired,
  getIcon: propTypes.func.isRequired,
}

export default InterestsGrid
