import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import groupNameColors from '../../../assets/groupColors'
import Member from '../../Groups/Group/Member'
import isAdmin from '../../../utils/userIsAdmin'

const SuggestionBox = props => {
  const { channel, members, hidden, top, profiles } = props

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
              {`Kiinnostukset: ${Object.keys(channel.purpose)
                .slice(0, 3)
                .join(', ')}`}
            </p>
          ) : (
            <div className="suggestion-box-info">
              <p>Tässä ryhmässä ei ole vielä muita jäseniä.</p>
              <p>Liity ryhmään ensimmäisenä</p>
            </div>
          )}
        </div>
        {channel && members && (
          <div className="suggestion-members-wrapper">
            <div className="group-current-members">
              {members &&
                members
                  .filter(member => !isAdmin(member.id, profiles))
                  .map(member => (
                    <Member
                      key={`suggestion-${member.id}`}
                      userId={member.id}
                      nickname={member.nickname || member.username}
                    />
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
  profiles: propTypes.instanceOf(Object).isRequired,
  hidden: propTypes.bool,
  top: propTypes.number,
}

SuggestionBox.defaultProps = {
  hidden: false,
  top: -10,
}

export default memo(SuggestionBox)
