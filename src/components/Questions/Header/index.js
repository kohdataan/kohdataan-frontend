import React from 'react'
import './styles.scss'

const Header = props => {

  return (
    <div className="questions-header">
        <div className="questions-header-text">Valitse mieluisin vaihtoehto</div>
        <div>Vastausten perusteella ehdotamme sinulle uusia ryhmiä</div>
    </div>
  )
}

export default Header