import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'

const StepButton = props => {
  const {
    params: { next, previous, last },
    onClick,
    nextButtonActive,
  } = props

  return (
    <div className="step-button-container">
      {previous && (
        <Link
          className="next-step-button"
          to={`/registration/${previous}`}
          onClick={onClick}
        >
          Edellinen
        </Link>
      )}
      {next && nextButtonActive && (
        <Link
          className="next-step-button"
          to={`/registration/${next}`}
          onClick={onClick}
        >
          Seuraava
        </Link>
      )}

      {next && !nextButtonActive && (
        <div className="next-step-button-inactive">Seuraava</div>
      )}

      {last && nextButtonActive && (
        <Link className="next-step-button" to="/me" onClick={onClick}>
          Tallenna
        </Link>
      )}

      {last && !nextButtonActive && (
        <div className="next-step-button-inactive">Tallenna</div>
      )}
    </div>
  )
}

StepButton.propTypes = {
  params: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  nextButtonActive: PropTypes.bool.isRequired,
}

export default memo(StepButton)
