import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import icons from '../../../contants/interestIcons'

const Interests = props => {
  const { options, interests, setInterests } = props
  const itemIsSelected = id => interests.includes(id)
  // Select item if less than 5 items are selected
  const addToSelected = key => {
    if (interests.length < 5) {
      const interestsArr = interests
      interestsArr.push(key)
      setInterests(interestsArr)
    }
  }

  const getIcon = name => {
    const iconObject = icons.find(item => item.key === name)
    return iconObject.icon
  }

  // Remove from selected items
  const removeFromSelected = id => {
    const interestsArr = interests
    const indx = interests.indexOf(id)
    if (indx > -1) {
      interestsArr.splice(indx, 1)
      setInterests(interestsArr)
    }
  }

  // Toggle selection
  const handleClick = id => () => {
    console.log(`clicked ${id}`)
    if (!itemIsSelected(id)) {
      addToSelected(id)
    } else {
      removeFromSelected(id)
    }
  }

  return (
    <div className="add-user-interests-container">
      <h1 className="add-user-interests-title">Kerro kiinnostuksistasi</h1>
      <p>Käytämme näitä kun suosittelemme sinulle uusia ryhmiä.</p>
      <h3>Valitse 1 - 5</h3>
      <div className="interests-grid">
        {options.map(interest => (
          <ButtonContainer
            key={interest.name}
            className={`${
              itemIsSelected(interest.id) ? 'interests-grid-item-selected' : ''
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
    </div>
  )
}

Interests.propTypes = {
  interests: propTypes.instanceOf(Array).isRequired,
  setInterests: propTypes.func.isRequired,
  options: propTypes.instanceOf(Array).isRequired,
}

export default Interests
