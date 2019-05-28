import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import getIcon from '../../../../utils/getIcon'

const InterestsGrid = props => {
  const { interestList } = props
  return (
    <div className="interests-grid">
      {interestList.map(interest => (
        <div className="interests-grid-item-container" key={interest.id}>
          <span className="interests-grid-item">
            <i
              aria-hidden="true"
              className={getIcon(interest.name)}
              title={interest.name}
            />
            <span className="interests-grid-label">{interest.name}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

InterestsGrid.propTypes = {
  interestList: propTypes.instanceOf(Array).isRequired,
}

export default memo(InterestsGrid)
