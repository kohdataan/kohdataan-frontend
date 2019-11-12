import React, { memo } from 'react'
import './styles.scss'
import botIcon from '../../assets/bot.svg'

const BottomNavigationBot = () => {
  const openBotModal = async () => {
    /* https://daveceddia.com/open-modal-in-react/ */
  }

  return (
    <span
      className="nav-bot"
      onClick={openBotModal}
      onKeyPress={openBotModal}
      role="button"
      tabIndex="0"
    >
      <img src={botIcon} alt="Botti" />
    </span>
  )
}

export default memo(BottomNavigationBot)
