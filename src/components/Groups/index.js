import React from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import './styles.scss'

const Groups = props => {
  const { channels, selectChannel } = props

  return (
    <div className="groups-wrapper">
        <div>
            <h1>Omat ryhmät</h1>
        </div>
        <div>
        { Object.keys(channels).length > 0 && Object.values(channels).map((channel => 
            <Group key={channel.id} channel={channel} clickHandler={selectChannel} />
            ))
        }
        </div>
    </div>
  )
}

Groups.propTypes = {
    channels: PropTypes.object.isRequired,
}

export default Groups