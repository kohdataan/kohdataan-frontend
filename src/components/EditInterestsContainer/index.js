import React, { memo, useEffect, useState, useRef } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import ModalContainer from '../ModalContainer'
import getIcon from '../../utils/getIcon'

const EditInterestsContainer = props => {
  const { options, interests, setInterests } = props
  const [sortedOptions, setSortedOptions] = useState(options)
  // Use ref of interests, because we don't want to sort each
  // time interests are changed, only on mount
  const interestsOnMount = useRef(interests)
  const itemIsSelected = id => interests.includes(id)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const sortOptions = () => {
      const sorted = Object.values(options).sort((a, b) => {
        if (interestsOnMount.current.includes(a.id)) {
          // Sort by selection
          if (interestsOnMount.current.includes(b.id)) {
            return a.name > b.name ? 1 : -1
          }
          return -1
        }
        if (interestsOnMount.current.includes(b.id)) {
          return 1
        }
        // Sort by name
        return a.name > b.name ? 1 : -1
      })
      return sorted
    }
    setSortedOptions(sortOptions())
  }, [options])

  const closeModal = () => {
    setOpenModal(false)
  }

  // Select item if less than 5 items are selected
  const addToSelected = key => {
    if (interests.length < 5) {
      const interestsArr = [...interests]
      interestsArr.push(key)
      setInterests(interestsArr)
    } else if (interests.length === 5) {
      setOpenModal(true)
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
      <ModalContainer
        modalIsOpen={openModal}
        closeModal={closeModal}
        label="User can have five interests at most"
      >
        <div>
          <h3 className="interests-modal-text">
            Voit valita enintään viisi kiinnostavaa asiaa.
          </h3>
          <p>Voit poistaa valinnan,kun klikkaat sitä uudestaan.</p>
          <ButtonContainer
            className="icon-btn interests-icon-btn"
            onClick={closeModal}
          >
            <div className="accept-rules-go-back-button go-back-button" />
          </ButtonContainer>
        </div>
      </ModalContainer>

    </div>
  )
}

EditInterestsContainer.propTypes = {
  interests: propTypes.instanceOf(Array).isRequired,
  setInterests: propTypes.func.isRequired,
  options: propTypes.instanceOf(Array).isRequired,
}

export default memo(EditInterestsContainer)
