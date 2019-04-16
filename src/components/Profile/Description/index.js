import React from 'react'
import './styles.scss'

const Description = props => {
  const { text } = props

  return (
    <div>
        <h2>Kuvaus</h2>
        <div className="description-text">{text}</div>
    </div>
  )
}

export default Description