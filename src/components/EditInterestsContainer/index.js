import React, { memo, useEffect, useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import getIcon from '../../utils/getIcon'

const EditInterestsContainer = props => {
  const { options, interests, setInterests } = props
  const [sortedOptions, setSortedOptions] = useState(options)
  const itemIsSelected = id => interests.includes(id)

  const sortOptions = () => {
    const sorted = Object.values(options).sort((a, b) => {
      if (itemIsSelected(a.id)) {
        // Sort by selection
        if (itemIsSelected(b.id)) {
          return a.name > b.name ? 1 : -1
        }
        return -1
      }
      if (itemIsSelected(b.id)) {
        return 1
      }
      return a.name > b.name ? 1 : -1
    })
    return sorted
  }

  useEffect(() => {
    setSortedOptions(sortOptions())
  }, [options])

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
      {sortedOptions.map(interest => (
        <ButtonContainer
          key={interest.id}
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
