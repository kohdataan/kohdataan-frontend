import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'
import ButtonContainer from '../../ButtonContainer'

const StepButton = props => {
  const {
    params: { skippable, next },
    onClick,
  } = props

  return (
    <div className="step-button-container">
      <ButtonContainer onClick={onClick}>test</ButtonContainer>
      <Link
        className={`${
          !skippable ? 'next-step-button-extra' : ''
        } next-step-button`}
        to={`/registration/${next}`}
        onClick={onClick}
      >
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
  onClick: PropTypes.func.isRequired,
}

export default StepButton
