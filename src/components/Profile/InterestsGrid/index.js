import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import getIcon from '../../../utils/getIcon'

const InterestsGrid = props => {
  const { interestList } = props

  const sortedInterestsList = [...interestList].sort((a, b) =>
    a.name > b.name ? 1 : -1
  )
  return (
    <section className="interests-grid">
      {sortedInterestsList.map(interest => (
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
    </section>
  )
}

InterestsGrid.propTypes = {
  interestList: propTypes.instanceOf(Array).isRequired,
}

export default memo(InterestsGrid)
