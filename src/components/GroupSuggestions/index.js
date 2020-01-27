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
    handleJoinChannel,
    channelMembers,
    getChannelInvitations,
    resetChannelInvitations,
  } = props

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
      )}
      <div className="group-suggestion-boxes">
        {channelsLoading && <BouncingLoader />}
        {cards && cards.length > 0 && !channelsLoading && (
          <div style={{ height: '100%' }}>
            {cards.map((card, i) =>
              i === cards.length - 1 ? (
                <Swipeable
                  key={card.id}
                  min={80}
                  buttons={({ left }) => (
                    <div className="suggestion-buttons-wrapper">
                      <ButtonContainer
                        className="skip-suggestion-button"
                        onClick={() => {
                          left()
                        }}
                      >
                        Ohita
                      </ButtonContainer>
                      <ButtonContainer
                        onClick={handleJoinChannel(card.id)}
                        className="join-suggestion-button"
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
                  />
                </Swipeable>
              ) : (
                <SuggestionBox
                  hidden
                  key={card.id}
                  channel={cards[i]}
                  members={channelMembers[cards[i].id]}
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
  handleJoinChannel: propTypes.func.isRequired,
  channelMembers: propTypes.instanceOf(Object).isRequired,
  getChannelInvitations: propTypes.func.isRequired,
  resetChannelInvitations: propTypes.func.isRequired,
}

export default memo(GroupSuggestions)
