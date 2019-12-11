import React, { memo } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const EditTitle = props => {
  const { text } = props
  return (
    <div className="edit-header-container">
      <h1 className="edit-header-text">{text}</h1>
    </div>
  )
}

EditTitle.propTypes = {
  text: propTypes.string.isRequired,
}

export default memo(EditTitle)
