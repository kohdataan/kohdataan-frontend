import React, { memo } from 'react'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const Header = props => {
  const { nickname, location, startDirect, currentUser } = props || ''

  return (
    <div className="profile-header-item">
      <h3>{nickname}</h3>
      {!currentUser && (
        <ButtonContainer onClick={startDirect} className="profile-dm-button">
          Aloita keskustelu
        </ButtonContainer>
      )}
      <div>{location}</div>
    </div>
  )
}

export default memo(Header)
