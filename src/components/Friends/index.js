import React, { memo, useEffect, useState } from 'react'
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
    history.push({
      pathname: '/me',
      state: { navigateBack: true },
    })
  }

  const steps = [
    {
      target: '.nav-link-Kaverit',
      content: (
        <div>
          <p className="tutorial-step">5/6</p>
          <h1 className="tutorial-header">
            Voit viestitellä kavereiden kanssa kahdestaan.
          </h1>
          <p className="tutorial-text">
            Löydät kaverit täältä, kohdasta Kaverit.
          </p>
          <ButtonContainer
            className="button friends-tutorial-btn"
            onClick={goToPreviousTutorial}
          >
            Edellinen
          </ButtonContainer>
        </div>
      ),
      disableBeacon: true,
    },
  ]

  const getStatusById = id => {
    const status = id ? statuses[id] : ''
    return status
  }

  const sortByUnreadCount = (a, b) => {
    // Sort primarily by unread count
    // and secondarily by latest post timestamp
    if (getUnreadCount(b.id) - getUnreadCount(a.id) === 0) {
      return b.last_post_at - a.last_post_at
    }
    return getUnreadCount(b.id) - getUnreadCount(a.id)
  }

  const handleFriendSearchReset = async () => {
    setFriendSearch('')
    setFriendSearchResult([])
    friendSearchTextInput.current.value = ''
  }

  // Filter out current user, surveybot, deleted users, and
  // only return profiles where nickname matches
  const filterSearchResults = (data, searchTerm) =>
    data &&
    data.filter(
      profile =>
        profile.id !== currentUserId &&
        profile.username !== 'surveybot' &&
        profile.position !== 'deleted' &&
        profile.delete_at === 0 &&
        profile.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleFriendSearchChange = async searchText => {
    setFriendSearch(searchText)
    try {
      if (searchText === '') {
        handleFriendSearchReset()
      } else {
        const foundProfiles = await searchProfiles(searchText)
        const filtered = await filterSearchResults(
          foundProfiles.data,
          searchText
        )
        if (filtered) {
          setFriendSearchResult(filtered)
        }
      }
    } catch (e) {
      setFriendSearchResult([])
    }
  }

  // if the user navigates back after visiting a profile, save the search term
  useEffect(() => {
    if (
      history.location &&
      history.location.state &&
      history.location.state.searchTerm
    ) {
      const text = history.location.state.searchTerm
      friendSearchTextInput.current.value = text
      setFriendSearch(text)
      handleFriendSearchChange(text)
    }
  }, [])

  return (
    <section className="friends-wrapper">
      <header className="friends-header">
        <h1>Kaverit</h1>
      </header>

      <div className="friends-search">
        <SearchBar
          handleChange={handleFriendSearchChange}
          placeholder="Kirjoita nimi"
          handleClear={handleFriendSearchReset}
          label="Hae kaveria"
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
                Et ole vielä viestitellyt kenenkään kanssa kahdestaan.
              </h2>
              <p className="no-friends-yet-text">
                Voit lähettää toiselle käyttäjälle yksityisviestin hänen
                profiilinsa alareunasta.
              </p>
              <p className="no-friends-yet-text">
                Pääset toisen käyttäjän profiiliin, kun klikkaat ryhmässä hänen
                kuvakettaan. Voit myös hakea käyttäjää hänen kutsumanimellään.
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
          navigateBack={false}
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
