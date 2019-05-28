import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../../ButtonContainer'

const OptionButton = props => {
  const { text, clickHandler } = props

  return (
    <div>
      <ButtonContainer className="options-button" onClick={clickHandler}>
        {text}
      </ButtonContainer>
    </div>
  )
}

OptionButton.propTypes = {
  text: propTypes.string.isRequired,
  clickHandler: propTypes.func.isRequired,
}

export default memo(OptionButton)
