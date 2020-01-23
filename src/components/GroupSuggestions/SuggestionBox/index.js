import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import groupNameColors from '../../../assets/groupColors'

const SuggestionBox = props => {
  const { channel, members, hidden, top } = props

  return (
    <div
      className={`group-box group-suggestion-box ${hidden ? 'hidden-box' : ''}`}
      aria-hidden={hidden}
      style={{ top: `-${top + 2}px ` }}
    >
      <div className="group-box-content">
        <div className="group-header">
          <div
            className="group-color-icon"
            style={{
              backgroundColor: groupNameColors[channel.display_name],
              border: `${
                channel.display_name.toLowerCase().includes('valkoiset')
                  ? '1px solid grey'
                  : 'none'
              }`,
            }}
          />
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
  )
}

SuggestionBox.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  members: propTypes.instanceOf(Array).isRequired,
  hidden: propTypes.bool,
  top: propTypes.number,
}

SuggestionBox.defaultProps = {
  hidden: false,
  top: -10,
}

export default memo(SuggestionBox)
