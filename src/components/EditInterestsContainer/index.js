import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import getIcon from '../../utils/getIcon'

const EditInterestsContainer = props => {
  const { options, interests, setInterests } = props
  const itemIsSelected = id => interests.includes(id)
  // Select item if less than 5 items are selected

  const addToSelected = key => {
    if (interests.length < 5) {
      const interestsArr = [...interests]
      interestsArr.push(key)
      setInterests(interestsArr)
    }
  }

  // Remove from selected items
  const removeFromSelected = id => {
    const interestsArr = [...interests]
    const indx = interests.indexOf(id)
    if (indx > -1) {
      interestsArr.splice(indx, 1)
      setInterests(interestsArr)
    }
  }

  // Toggle selection
  const handleClick = id => () => {
    if (!itemIsSelected(id)) {
      addToSelected(id)
    } else {
      removeFromSelected(id)
    }
  }

  return (
    <div className="interests-grid">
      {options.map(interest => (
        <ButtonContainer
          key={interest.name}
          className={`${
            interests.includes(interest.id)
              ? 'interests-grid-item-selected'
              : ''
          } interests-grid-edit-button interests-grid-edit-item`}
          onClick={handleClick(interest.id)}
        >
          <i
            aria-hidden="true"
            className={getIcon(interest.name)}
            title={interest.name}
          />
          <span className="interests-grid-label">{interest.name}</span>
        </ButtonContainer>
      ))}
    </div>
  )
}

EditInterestsContainer.propTypes = {
  interests: propTypes.instanceOf(Array).isRequired,
  setInterests: propTypes.func.isRequired,
  options: propTypes.instanceOf(Array).isRequired,
}

export default memo(EditInterestsContainer)
