import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Swipeable from 'react-swipy'
import ButtonContainer from '../../ButtonContainer'

const SuggestionBox = props => {
  const { channel, handleJoinChannel, handleSkipChannel, members } = props
  return (
    <Swipeable
      buttons={({ left }) => (
        <div className="suggestion-buttons-wrapper">
          <ButtonContainer
            className="skip-suggestion-button"
            onClick={() => {
              left()
            }}
          >
            Ohita
          </ButtonContainer>
          <ButtonContainer
            onClick={handleJoinChannel(channel.id)}
            className="join-suggestion-button"
            secondary
          >
            Liity
          </ButtonContainer>
        </div>
      )}
      onAfterSwipe={handleSkipChannel}
    >
      <div className="group-box group-suggestion-box">
        <div className="group-box-content">
          <div className="group-header">
            <h2>{channel.display_name}</h2>
          </div>
          <p>{`Yhteistä: ${channel.display_name}`}</p>
          {channel && members && (
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
        </div>
      </div>
    </Swipeable>
  )
}

SuggestionBox.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  handleJoinChannel: propTypes.func.isRequired,
  handleSkipChannel: propTypes.func.isRequired,
  members: propTypes.instanceOf(Array).isRequired,
}

export default memo(SuggestionBox)
