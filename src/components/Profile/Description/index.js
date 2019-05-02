import React from 'react'
import './styles.scss'

const Description = props => {
  const { text } = props || ''

  return (
    <div className="description-container">
      <h2 className="description-header">Kuvaus</h2>
      <div className="description-text">{text}</div>
    </div>
  )
}

export default Description
