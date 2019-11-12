import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import EditInterestsContainer from '../../EditInterestsContainer'

const Interests = props => {
  const { options, interests, setInterests, setInterestsValid } = props

  return (
    <div className="add-user-interests-container">
      <h1 className="add-user-interests-title">Kerro kiinnostuksistasi</h1>
      <p>Käytämme näitä kun suosittelemme sinulle uusia ryhmiä.</p>
      <h3>Valitse 3-5</h3>
      <EditInterestsContainer
        options={options}
        interests={interests}
        setInterests={setInterests}
        setInterestsValid={setInterestsValid}
      />
    </div>
  )
}

Interests.propTypes = {
  interests: propTypes.instanceOf(Array).isRequired,
  setInterests: propTypes.func.isRequired,
  options: propTypes.instanceOf(Array).isRequired,
  setInterestsValid: propTypes.func.isRequired,
}

export default memo(Interests)
