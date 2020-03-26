import React, { memo } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const EditTitle = props => {
  const { text, history } = props

  const closeEditPage = () => {
    history.goBack()
  }

  return (
    <div className="edit-header-container">
      <h1 className="edit-header-text">{text}</h1>
      <ButtonContainer
        className="icon-btn go-back-button edit-header-btn"
        onClick={closeEditPage}
        label="Sulje"
      >
        {' '}
      </ButtonContainer>
    </div>
  )
}

EditTitle.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  text: propTypes.string.isRequired,
}

export default memo(EditTitle)
