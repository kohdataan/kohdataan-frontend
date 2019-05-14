import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'

const Interests = props => {
  const { interests, setInterests } = props

  const interestList = [
    { key: 'Eläimet', icon: 'fas fa-paw fa-fw' },
    { key: 'Matkustus', icon: 'fas fa-globe-europe fa-fw' },
    { key: 'Urheilu', icon: 'fas fa-volleyball-ball fa-fw' },
    { key: 'Luonto', icon: 'fas fa-tree fa-fw' },
    { key: 'Elokuvat', icon: 'fas fa-film fa-fw' },
    { key: 'Ruoka', icon: 'fas fa-utensils fa-fw' },
    { key: 'Mekaniikka', icon: 'fas fa-cogs fa-fw' },
    { key: 'Musiikki', icon: 'fas fa-music fa-fw' },
    { key: 'Taide', icon: 'fas fa-palette fa-fw' },
  ]

  const itemIsSelected = key => interests.includes(key)

  // Select item if less than 5 items are selected
  const addToSelected = key => {
    if (interests.length < 5) {
      const interestsArr = interests
      interestsArr.push(key)
      setInterests(interestsArr)
    }
  }

  // Remove from selected items
  const removeFromSelected = key => {
    const interestsArr = interests
    const indx = interests.indexOf(key)
    if (indx > -1) {
      interestsArr.splice(indx, 1)
      setInterests(interestsArr)
    }
  }

  // Toggle selection
  const handleClick = interest => () => {
    console.log(`clicked ${interest}`)
    if (!itemIsSelected(interest)) {
      addToSelected(interest)
    } else {
      removeFromSelected(interest)
    }
  }

  const getClassNamesList = item => {
    return [
      'interests-grid-edit-button',
      'interests-grid-edit-item',
      itemIsSelected(item) ? 'interests-grid-item-selected' : '',
    ].join(' ')
  }

  return (
    <div className="add-user-interests-container">
      <h1 className="add-user-interests-title">Kerro kiinnostuksistasi</h1>
      <p>Käytämme näitä kun suosittelemme sinulle uusia ryhmiä.</p>
      <h3>Valitse 1 - 5</h3>
      <div className="interests-grid">
        {interestList.map(interest => (
          <ButtonContainer
            key={interest.key}
            className={getClassNamesList(interest.key)}
            onClick={handleClick(interest.key)}
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
    </div>
  )
}

Interests.propTypes = {
  interests: propTypes.instanceOf(Array).isRequired,
  setInterests: propTypes.func.isRequired,
}

export default Interests
