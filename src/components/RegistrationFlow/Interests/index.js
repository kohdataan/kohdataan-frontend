import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import EditInterestsContainer from '../../EditInterestsContainer'

const Interests = (props) => {
  const { options, interests, setInterests, hideStep } = props

  return (
    <div className="add-user-interests-container">
      <h2 className="profile-creation-title">Kerro, mikä sinua kiinnostaa.</h2>
      <p>
        Ehdotamme sinulle kiinnostustesi mukaan keskusteluryhmiä, joissa voit
        tutustua uusiin ihmisiin.
      </p>
      <div className="profile-creation-title-container">
        <h2 className="profile-creation-title">Valitse 3-5</h2>
        {!hideStep && <span className="profile-creation-step-text">6/6</span>}
      </div>

      <EditInterestsContainer
        options={options}
        interests={interests}
        setInterests={setInterests}
      />
    </div>
  )
}

Interests.propTypes = {
  interests: propTypes.instanceOf(Array).isRequired,
  setInterests: propTypes.func.isRequired,
  options: propTypes.instanceOf(Array).isRequired,
  hideStep: propTypes.bool,
}

Interests.defaultProps = {
  hideStep: false,
}

export default memo(Interests)
