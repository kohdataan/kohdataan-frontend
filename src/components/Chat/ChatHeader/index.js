import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const Header = props => {
  const { channel } = props

  return (
    <div className="chat-header">
      <h3>{channel && channel.display_name}</h3>
    </div>
  )
}

Header.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
}

export default Header
