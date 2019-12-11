import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import SuggestionBox from './SuggestionBox'

const GroupSuggestions = props => {
  const { channels, handleJoinChannel, channelMembers } = props
  return (
    <div className="group-suggestions">
      <h1>Ehdotetut ryhmät</h1>
      {!channels && (
        <div>Saat lisää ehdotuksia vastaamalla päivän kysymyksiin.</div>
      )}
      <div className="group-suggestion-boxes">
        {channels &&
          channels.map(channel => (
            <SuggestionBox
              key={channel.id}
              channel={channel}
              handleJoinChannel={handleJoinChannel}
              members={channelMembers[channel.id]}
            />
          ))}
      </div>
    </div>
  )
}

GroupSuggestions.propTypes = {
  channels: propTypes.instanceOf(Array).isRequired,
  handleJoinChannel: propTypes.func.isRequired,
  channelMembers: propTypes.instanceOf(Object).isRequired,
}

export default memo(GroupSuggestions)
