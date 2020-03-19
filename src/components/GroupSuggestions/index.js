import React, { memo, useState, useEffect } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Swipeable from 'react-swipy'
import SuggestionBox from './SuggestionBox'
import ButtonContainer from '../ButtonContainer'
import BouncingLoader from '../BouncingLoader'

const GroupSuggestions = props => {
  const {
    channels,
    joinedChannels,
    profiles,
    teams,
    handleJoinChannel,
    channelMembers,
    getChannelInvitations,
    resetChannelInvitations,
  } = props

  console.log(joinedChannels)

  const [cards, setCards] = useState(channels)
  const [channelsLoading, setChannelsLoading] = useState(false)

  const remove = () => {
    // When all cards are skipped,
    // reset state invitations
    setCards(cards.slice(0, -1))
    if (cards.length === 1) {
      resetChannelInvitations()
    }
  }

  const handleGetChannelsAgain = async () => {
    setChannelsLoading(true)
    await getChannelInvitations()
    setChannelsLoading(false)
  }

  useEffect(() => {
    setCards([...channels])
  }, [channels])

  return (
    <div className="group-suggestions">
      <h1>Uudet ryhmät</h1>
      {cards && cards.length > 0 && !channelsLoading ? (
        <div className="group-suggestion-info">
          Kiinnostaako sinua seuraava ryhmä?
        </div>
      ) : (
        <div>
          {joinedChannels && joinedChannels.length < 6 ? (
            <div>
              <p>
                Sinulle ehdotetaan uusia ryhmiä päivittäin kiinnostusten mukaan.
              </p>
              <ButtonContainer
                secondary
                className="get-suggestions-again-button"
                onClick={handleGetChannelsAgain}
              >
                Näytä uudestaan
              </ButtonContainer>
            </div>
          ) : (
            <p>
              Olet jo viidessä eri ryhmässä, poistu ensin jostakin ryhmästä ja
              näet uusia ryhmiä.
            </p>
          )}
        </div>
      )}
      <div className="group-suggestion-boxes">
        {channelsLoading && <BouncingLoader />}
        {cards && cards.length > 0 && !channelsLoading && (
          <div>
            {cards.map((card, i) =>
              i === cards.length - 1 ? (
                <Swipeable
                  key={card.id}
                  min={80}
                  buttons={({ left }) => (
                    <div className="suggestion-buttons-wrapper">
                      <ButtonContainer
                        className="suggestion-button button-skip"
                        onClick={() => {
                          left()
                        }}
                      >
                        Älä liity
                      </ButtonContainer>
                      <ButtonContainer
                        onClick={handleJoinChannel(card.id)}
                        className="suggestion-button button-join"
                        secondary
                      >
                        Liity
                      </ButtonContainer>
                    </div>
                  )}
                  onAfterSwipe={remove}
                >
                  <SuggestionBox
                    key={cards[i].id}
                    channel={cards[i]}
                    members={channelMembers[cards[i].id]}
                    profiles={profiles}
                    teams={teams}
                  />
                </Swipeable>
              ) : (
                <SuggestionBox
                  hidden
                  key={card.id}
                  channel={cards[i]}
                  members={channelMembers[cards[i].id]}
                  teams={teams}
                  profiles={profiles}
                  top={cards.length - i}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

GroupSuggestions.propTypes = {
  channels: propTypes.instanceOf(Array).isRequired,
  joinedChannels: propTypes.instanceOf(Object).isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
  teams: propTypes.instanceOf(Object).isRequired,
  handleJoinChannel: propTypes.func.isRequired,
  channelMembers: propTypes.instanceOf(Object).isRequired,
  getChannelInvitations: propTypes.func.isRequired,
  resetChannelInvitations: propTypes.func.isRequired,
}

export default memo(GroupSuggestions)
