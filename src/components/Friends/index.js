import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import FriendSearch from './FriendSearch'
import Tutorial from '../Tutorial'
import ButtonContainer from '../ButtonContainer'
import SearchBar from '../SearchBar'
import './styles.scss'

const Friends = props => {
  const {
    channels,
    getUnreadCount,
    getUsername,
    getPosts,
    searchProfiles,
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
  const [friendSearchResult, setFriendSearchResult] = useState([])
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

  const sortByUnreadCount = (a, b) =>
    getUnreadCount(b.id) - getUnreadCount(a.id)

  const filterSearchResults = data =>
    data &&
    data.filter(
      profile =>
        profile.id !== currentUserId && profile.username !== 'surveybot'
    )

  const handleFriendSearchChange = async searchText => {
    setFriendSearch(searchText)
    if (searchText === '') {
      setFriendSearchResult([])
    } else {
      try {
        const foundProfiles = await searchProfiles(searchText)
        // Filter out current user profile
        const filteredProfiles = filterSearchResults(foundProfiles.data)
        setFriendSearchResult(filteredProfiles)
      } catch (e) {
        setFriendSearchResult([])
      }
    }
  }

  const handleFriendSearchReset = async () => {
    setFriendSearch('')
    friendSearchTextInput.current.value = ''
  }

  return (
    <section className="friends-wrapper">
      <header className="friends-header">
        <h1>Kaverit</h1>
      </header>

      <div className="friends-search">
        <SearchBar
          expression={handleFriendSearchChange}
          placeholder="Hae kaveria"
          handleClear={handleFriendSearchReset}
          label="hae kaveria"
          ref={friendSearchTextInput}
        />
      </div>
      {friendSearch.length === 0 ? (
        <div className="friends-boxes">
          {channels && channels.length > 0 ? (
            Object.values(channels)
              .sort(sortByUnreadCount)
              .map(channel => (
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
            <section>
              <h2 className="no-friends-yet-header">
                Sinulla ei ole vielä yksityisviestejä.
              </h2>
              <p className="no-friends-yet-text">
                Voit lähettää toiselle käyttäjälle yksityisviestin hänen
                profiilistaan. Pääset toisen käyttäjän profiiliin ryhmän kautta,
                kun klikkaat ryhmässä hänen kuvakettaan.
              </p>
            </section>
          )}
        </div>
      ) : (
        <div className="friends-boxes">
          {Object.values(friendSearchResult).map(profile => (
            <FriendSearch
              key={profile.id}
              profileData={profile}
              searchTerm={friendSearch}
            />
          ))}
          <p className="found-friends-count-info">{`Löydettiin ${friendSearchResult.length} käyttäjää`}</p>
        </div>
      )}
      {!tutorialWatched && (
        <Tutorial
          steps={steps}
          history={history}
          updateTutorialWatched={updateTutorialWatched}
        />
      )}
    </section>
  )
}

Friends.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  getUnreadCount: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  searchProfiles: PropTypes.func.isRequired,
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
