import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const OptionButton = props => {
  const { text, clickHandler } = props

  return (
    <div>
      <button type="button" className="options-button" onClick={clickHandler}>
        {text}
      </button>
    </div>
  )
}

OptionButton.propTypes = {
  text: propTypes.string.isRequired,
  clickHandler: propTypes.func.isRequired,
}

export default OptionButton
