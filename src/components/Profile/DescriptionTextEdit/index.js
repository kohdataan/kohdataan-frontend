import React, { useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const DescriptionTextEdit = props => {
  const { currentText, updateUser } = props
  const [descriptionText, setDescriptionText] = useState(currentText)

  const handleSubmit = e => {
    e.preventDefault()
    console.log(descriptionText)
    updateUser({ description: descriptionText })
    setDescriptionText(descriptionText)
  }

  const handleChange = e => {
    setDescriptionText(e.target.value)
  }

  return (
    <div className="description-container">
      <div className="description-text-edit-title-wrapper">
        <h2 className="description-header-edit">Kuvaus</h2>
        <h2 className="max-length-label">{`${descriptionText.length}/ 200`}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description textfield">
          <textarea
            className="description-text-edit-input"
            id="description"
            maxLength="200"
            type="text"
            value={descriptionText}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value=">" />
      </form>
    </div>
  )
}

DescriptionTextEdit.propTypes = {
  currentText: propTypes.string.isRequired,
  updateUser: propTypes.func.isRequired,
}

export default DescriptionTextEdit
