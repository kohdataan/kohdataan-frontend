import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'

const PrevNextNav = (props) => {
  const { current, setCurrent, data } = props
  const numQuestions = data.length
  const showNext = current < data.length - 1
  const showPrew = current > 0

  const handleClick = (e) => () => {
    return e === 'next' ? setCurrent(current + 1) : setCurrent(current - 1)
  }

  return (
    <div className="prevnext-nav">
      {showPrew && (
        <ButtonContainer
          className="nav-button prev-button"
          onClick={handleClick('prev')}
          role="link"
        >
          Edellinen
        </ButtonContainer>
      )}
      <span>{`${current + 1}/${numQuestions}`}</span>
      {showNext && (
        <ButtonContainer
          className="nav-button next-button"
          onClick={handleClick('next')}
          role="link"
        >
          Seuraava
        </ButtonContainer>
      )}
    </div>
  )
}

PrevNextNav.propTypes = {
  current: propTypes.number.isRequired,
  setCurrent: propTypes.func.isRequired,
  data: propTypes.instanceOf(Array).isRequired,
}

export default memo(PrevNextNav)
