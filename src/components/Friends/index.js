import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import ValidatedTextArea from '../ValidatedTextArea'
import Tutorial from '../Tutorial'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const Friends = props => {
  const {
    channels,
    getUnreadCount,
    getUsername,
    getPosts,
    getLatestMessage,
    membersInChannel,
    tutorialWatched,
    updateUser,
    history,
    myUserInfo,
    statuses,
    currentUserId,
  } = props

  const [friendSearch, setFriendSearch] = useState('')
  const friendSearchTextInput = React.createRef()

  const updateTutorialWatched = () => updateUser({ tutorialWatched: true })

  const goToPreviousTutorial = () => {
    history.push('/me')
  }

  const steps = [
    {
      target: '.nav-link-Kaverit',
      content: (
        <>
          <p className="tutorial-text">
            Voit viestitellä kavereiden kanssa kahdestaan.
          </p>
          <p className="tutorial-text">Löydät kaverit täältä.</p>
          <ButtonContainer
            className="button friends-tutorial-btn"
            onClick={goToPreviousTutorial}
          >
            Edellinen
          </ButtonContainer>
        </>
      ),
      disableBeacon: true,
    },
  ]

  const getStatusById = id => {
    const status = id ? statuses[id] : ''
    return status
  }

  const handleFriendSearchChange = event => {
    setFriendSearch(event.target.value)
  }

  const handleFriendSearchReset = () => {
    setFriendSearch('')
    friendSearchTextInput.current.value = ''
  }

  return (
    <main className="friends-wrapper">
      <div className="friends-header">
        <h1>Kaverit</h1>
      </div>
      <div className="friends-search">
        <ValidatedTextArea
          label="Hae kaveria"
          name="friendSearch"
          onChange={handleFriendSearchChange}
          ref={friendSearchTextInput}
          showLabel={false}
          maxLength={20}
          rows={1}
          value=""
        />
        <ButtonContainer
          className="registration-problem-button"
          onClick={handleFriendSearchReset}
          tabIndex="0"
        >
          Sulje
        </ButtonContainer>
      </div>
      <div className="friends-boxes">
        {channels && channels.length > 0 ? (
          Object.values(channels).map(channel => (
            <Friend
              key={channel.id}
              channel={channel}
              unreadCount={getUnreadCount(channel.id)}
              getUsername={getUsername}
              getPosts={getPosts}
              getLatestMessage={getLatestMessage}
              membersInChannel={membersInChannel}
              myUserInfo={myUserInfo}
              getStatusById={getStatusById}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <h3 className="no-friends-yet-header">
            Sinulla ei ole vielä yksityisviestejä.
          </h3>
        )}
      </div>
      {!tutorialWatched && (
        <Tutorial
          steps={steps}
          history={history}
          updateTutorialWatched={updateTutorialWatched}
        />
      )}
    </main>
  )
}

Friends.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  getUnreadCount: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getLatestMessage: PropTypes.func.isRequired,
  membersInChannel: PropTypes.instanceOf(Object).isRequired,
  tutorialWatched: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  statuses: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string.isRequired,
}

export default memo(Friends)
