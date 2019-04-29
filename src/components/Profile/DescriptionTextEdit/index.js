import React, { useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const DescriptionTextEdit = props => {
  const { currentText } = props
  const [descriptionText, setDescriptionText] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(descriptionText)
    setDescriptionText('')
  }

  const handleChange = e => {
    setDescriptionText(e.target.value)
  }

  return (
    <div className="description-container">
      <h2 className="description-header">Kuvaus</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">
          <textarea
            className="description-text-edit-input"
            id="message"
            type="text"
            value={descriptionText}
            onChange={handleChange}
            placeholder={currentText}
          />
        </label>
        <input type="submit" value=">" />
      </form>
    </div>
  )
}

DescriptionTextEdit.propTypes = {
  currentText: propTypes.string.isRequired,
}

export default DescriptionTextEdit
