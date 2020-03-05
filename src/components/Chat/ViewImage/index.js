import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const ViewImage = ({ history, match }) => {
  const goBack = () => {
    history.goBack()
  }

  const { fileId } = match.params

  return (
    <main className="view-image-content">
      <ButtonContainer
        className="view-image-go-back-button go-back-button"
        onClick={goBack}
      >
        <span className="sr-only">Sulje</span>
      </ButtonContainer>
      <div className="image">
        <img
          className="view-image"
          src={`${process.env.REACT_APP_MATTERMOST_URL}/api/v4/files/${fileId}`}
          alt="attachment"
          width="100%"
          height="100%"
        />
      </div>
    </main>
  )
}

ViewImage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
}

export default memo(ViewImage)
