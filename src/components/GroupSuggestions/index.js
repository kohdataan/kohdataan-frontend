import React, { memo, useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Swipeable from 'react-swipy'
import SuggestionBox from './SuggestionBox'
import ButtonContainer from '../ButtonContainer'

const GroupSuggestions = props => {
  const { channels, handleJoinChannel, channelMembers } = props

  const [cards, setCards] = useState(channels)
  const remove = () => setCards(cards.slice(0, -1))

  return (
    <div className="group-suggestions">
      <h1>Ehdotetut ryhmät</h1>
      {!channels && (
        <div>Saat lisää ehdotuksia vastaamalla päivän kysymyksiin.</div>
      )}
      <div className="group-suggestion-boxes">
        {cards && cards.length > 0 && (
          <div>
            {cards &&
              cards.map((card, i) =>
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
}

export default memo(GroupSuggestions)
