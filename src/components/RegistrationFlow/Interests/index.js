import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import EditInterestsContainer from '../../EditInterestsContainer'

const Interests = props => {
  const { options, interests, setInterests } = props

  return (
    <main role="main" className="add-user-interests-container">
      <h2 className="profile-creation-title">Kerro, mikä sinua kiinnostaa</h2>
      <p>
        Ehdotamme sinulle kiinnostustesi mukaan keskusteluryhmiä, joissa voit
        tutustua uusiin ihmisiin.
      </p>
      <div className="profile-creation-title-container">
        <h3 className="profile-creation-title">Valitse 3-5</h3>
        <span className="profile-creation-step-text">6/6</span>
      </div>

      <EditInterestsContainer
        options={options}
        interests={interests}
        setInterests={setInterests}
      />
    </main>
  )
}

Interests.propTypes = {
  interests: propTypes.instanceOf(Array).isRequired,
  setInterests: propTypes.func.isRequired,
  options: propTypes.instanceOf(Array).isRequired,
}

export default memo(Interests)
