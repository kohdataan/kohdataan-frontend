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
          <Link to="/">
            <ButtonContainer
              className="suggestion-button cancel"
              onClick={() => console.log('clicked')}
            >
              <i
                aria-hidden="true"
                className="fas fa-times"
                title="Älä Liity"
              />
              Älä liity
            </ButtonContainer>
          </Link>
          <Link to="/">
            <ButtonContainer
              className="suggestion-button join"
              onClick={handleJoinChannel(channel.id)}
            >
              <i
                aria-hidden="true"
                className="far fa-check-circle"
                title="Liity"
              />
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
