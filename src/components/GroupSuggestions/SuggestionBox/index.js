import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SuggestionBox = props => {
  const { channel, handleJoinChannel, members } = props
  return (
    <div className="group-box suggestions-box">
      <div className="group-box-content">
        <div className="group-header">
          <h2>{channel.display_name}</h2>
        </div>
        <p>{`Yhteistä: ${channel.display_name}`}</p>
        {members && (
          <div className="suggestion-members-wrapper">
            <p>{`${members.length} jäsentä`}</p>
            <div className="suggestion-members-info">
              {members.map(member => (
                <p className="suggestion-member" key={member.id}>
                  {member.nickname || member.username}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="suggestion-buttons-wrapper">
          <Link
            to="/"
            className="suggestion-button cancel"
            onClick={() => console.log('clicked')}
          >
            <i aria-hidden="true" className="fas fa-times" title="Älä Liity" />
            Älä liity
          </Link>
          <div
            role="link"
            tabIndex="-1"
            className="suggestion-button join"
            onClick={handleJoinChannel(channel.id)}
            onKeyPress={handleJoinChannel(channel.id)}
          >
            <i
              aria-hidden="true"
              className="far fa-check-circle"
              title="Liity"
            />
            Liity
          </div>
        </div>
      </div>
    </div>
  )
}

SuggestionBox.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  handleJoinChannel: propTypes.func.isRequired,
  members: propTypes.instanceOf(Array).isRequired,
}

export default memo(SuggestionBox)
