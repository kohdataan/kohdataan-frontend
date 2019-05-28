import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const DescriptionTextEdit = props => {
  const { currentText, onChange } = props

  const handleChange = e => {
    onChange(e.target.value)
  }

  return (
    <div className="description-container">
      <div className="description-text-edit-title-wrapper">
        <h2 className="description-header-edit">Kuvaus</h2>
        <h2 className="max-length-label">{`${currentText.length}/ 200`}</h2>
      </div>
      <form>
        <label htmlFor="description textfield">
          <textarea
            className="description-text-edit-input"
            id="description"
            maxLength="200"
            type="text"
            value={currentText}
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  )
}

DescriptionTextEdit.propTypes = {
  currentText: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
}

export default memo(DescriptionTextEdit)
