import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const StepButton = (props) => {
  const {
    params: { next, previous, last },
    onClick,
    nextButtonActive,
    setOpenModal,
    history,
  } = props

  const handleProfileReady = async () => {
    await onClick()
    history.push('/me')
  }

  return (
    <div className="step-button-container">
      {previous && (
        <Link className="next-step-button" to={`/registration/${previous}`}>
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
        <ButtonContainer
          className="next-step-button"
          onClick={handleProfileReady}
        >
          Tallenna
        </ButtonContainer>
      )}

      {last && !nextButtonActive && (
        <ButtonContainer
          className="next-step-button-inactive"
          onClick={() => setOpenModal(true)}
        >
          Tallenna
        </ButtonContainer>
      )}
    </div>
  )
}

StepButton.propTypes = {
  params: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  nextButtonActive: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}

export default memo(StepButton)
