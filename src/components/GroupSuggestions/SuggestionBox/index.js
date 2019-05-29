import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SuggestionBox = props => {
  const { channel, handleJoinChannel } = props

  return (
    <div className="group-box">
      <div className="group-box-content">
        <div className="group-header">
          <h2>{channel.display_name}</h2>
        </div>
        <p>{`Yhteistä: ${channel.display_name}`}</p>
        <div className="suggestion-buttons-wrapper">
          <Link
            to="/"
            className="suggestion-button cancel"
            onClick={() => console.log('clicked')}
          >
            <i aria-hidden="true" className="fas fa-times" title="Älä Liity" />
            Älä liity
          </Link>
          <Link
            to="/"
            className="suggestion-button join"
            onClick={handleJoinChannel(channel.id)}
          >
            <i
              aria-hidden="true"
              className="far fa-check-circle"
              title="Liity"
            />
            Liity
          </Link>
        </div>
      </div>
    </div>
  )
}

SuggestionBox.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  handleJoinChannel: propTypes.func.isRequired,
}

export default memo(SuggestionBox)
