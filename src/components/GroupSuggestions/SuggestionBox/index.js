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
        <div className="group-in-common">
          {Object.keys(channel.purpose) &&
          Object.keys(channel.purpose).length > 0 ? (
            <p className="group-in-common-text">
              {`Kiinnostuksenkohteita: ${Object.keys(channel.purpose).join(
                ' '
              )}`}
            </p>
          ) : (
            <p>Ei vielä yhdistäviä kinnostuksenkohteita</p>
          )}
        </div>
        {channel && members && (
          <div className="suggestion-members-wrapper">
            <div className="suggestion-members-info">
              {members.map(member => (
                <p className="suggestion-member" key={member.id}>
                  {member.nickname}
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
