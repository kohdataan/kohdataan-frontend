import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonContainer from '../../ButtonContainer'

const SuggestionBox = props => {
  const { channel, handleJoinChannel } = props

  return (
    <div className="group-box">
      <div>
        <h2>{channel.display_name}</h2>
        <p>Yhteistä: urheilu, ulkoilu, mekaniikka</p>
        <div className="suggestion-buttons-wrapper">
          <Link to="/ryhmat">
            <ButtonContainer
              className="suggestion-button cancel"
              onClick={() => console.log('clicked')}
            >
              <i className="fas fa-times" />
              Älä liity
            </ButtonContainer>
          </Link>
          <Link to="/ryhmat">
            <ButtonContainer
              className="suggestion-button join"
              onClick={handleJoinChannel(channel.id)}
            >
              <i className="far fa-check-circle" />
              Liity
            </ButtonContainer>
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

export default SuggestionBox
