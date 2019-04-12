import React from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import './styles.scss'

const Groups = props => {
  const { channels, selectChannel } = props

  return (
    <div>
        <div>
            <h3>Omat ryhmät</h3>
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