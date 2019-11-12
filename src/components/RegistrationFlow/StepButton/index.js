import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'

const StepButton = props => {
  const {
    params: { skippable, next, previous, last, valid, current },
    onClick,
  } = props

  return (
    <div className="step-button-container">
      {previous && (
        <Link
          className={`${
            !skippable ? 'next-step-button-extra' : ''
          } next-step-button`}
          to={`/registration/${previous}`}
          onClick={onClick}
        >
          Edellinen
        </Link>
      )}
      {next && (
        <Link
          className={`${
            !skippable ? 'next-step-button-extra' : ''
          } next-step-button`}
          to={valid ? `/registration/${next}` : `/registration/${current}`}
          onClick={onClick}
        >
          Seuraava
        </Link>
      )}
      {last && (
        <Link
          className={`${
            !skippable ? 'next-step-button-extra' : ''
          } next-step-button`}
          to="/profiili"
          onClick={onClick}
        >
          Tallenna
        </Link>
      )}
    </div>
  )
}

StepButton.propTypes = {
  params: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default memo(StepButton)
