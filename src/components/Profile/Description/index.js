import React from 'react'
import './styles.scss'

const Description = props => {
  const { text } = props

  return (
    <div>
        <h3>Kuvaus</h3>
        <div>{text}</div>
    </div>
  )
}

export default Description