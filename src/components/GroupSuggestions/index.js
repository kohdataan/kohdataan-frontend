import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import SuggestionBox from './SuggestionBox'

const GroupSuggestions = props => {
  const { channels, handleJoinChannel, getMembersByChannelId } = props
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
              getMembersByChannelId={getMembersByChannelId}
            />
          ))}
      </div>
    </div>
  )
}

GroupSuggestions.propTypes = {
  channels: propTypes.instanceOf(Array).isRequired,
  handleJoinChannel: propTypes.func.isRequired,
  getMembersByChannelId: propTypes.func.isRequired,
}

export default memo(GroupSuggestions)
