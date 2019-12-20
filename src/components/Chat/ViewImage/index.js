import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const ViewImage = ({ history, match}) => {
  console.log('props ', history)
  const { fileId } = match.params
  const goBack = e => {
    console.log(e)
    history.goBack()
  }

  return (
    <main className="view-image-content">
      <div className="image">
        <ButtonContainer className="view-image-go-back-button" onClick={goBack}>
          x
        </ButtonContainer>
        <img
          className="view-image"
          src={`http://${
            process.env.REACT_APP_MATTERMOST_URL
          }/api/v4/files/${fileId}`}
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
