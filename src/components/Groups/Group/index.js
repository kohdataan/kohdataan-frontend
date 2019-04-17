import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'

const Group = props => {
  const { channel, clickHandler } = props

  return (
    <ButtonContainer className="group-box" onClick={clickHandler(channel.id)}>
      <h2>{channel.display_name}</h2>
      <h4>test</h4>
    </ButtonContainer>
  )
}

Group.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  clickHandler: propTypes.func.isRequired,
}

export default Group
