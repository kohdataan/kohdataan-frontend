import React from 'react'
import './styles.scss'
import SuggestionBox from './SuggestionBox'

const GroupSuggestions = props => {
  const { channels, handleJoinChannel } = props || []
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
            />
          ))}
      </div>
    </div>
  )
}

export default GroupSuggestions
