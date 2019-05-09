import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'

const StepButton = props => {
  const {
    params: { skippable, next },
  } = props

  return (
    <div className="step-button-container">
      <Link className="next-step-button" to={`/registration/${next}`}>
        Seuraava
      </Link>
      {skippable && (
        <Link className="skip-button" to={`/registration/${next}`}>
          ohita
        </Link>
      )}
    </div>
  )
}

StepButton.propTypes = {
  params: PropTypes.instanceOf(Object).isRequired,
}

export default StepButton
