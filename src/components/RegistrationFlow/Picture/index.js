/* eslint-disable no-alert */
import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import AvatarEditor from 'react-avatar-editor'
import ShadowBox from '../../ShadowBox'
import './styles.scss'
import ImageUploader from '../../ImageUploader'

const Picture = props => {
  const { onChange, hideStep, image } = props
  const [showFileLoader, setShowFileLoader] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [imageData, setImageData] = useState(null)

  return (
    <ShadowBox>
      <main role="main" className="add-user-picture-container">
        <div className="add-user-picture-title-container">
          <h2
            className="profile-creation-title add-user"
            id="add-user-picture-title-text"
          >
            Valitse oma kuva.
          </h2>
          {!hideStep && (
            <span className="profile-creation-step-text add-user-picture-step-text">
              5/6
            </span>
          )}
        </div>

        <div className="add-user-picture-content-container">
          {showFileLoader ? (
            <ImageUploader
              onChange={onChange}
              setShowFileLoader={setShowFileLoader}
              setImageData={setImageData}
            />
          ) : (
            <AvatarEditor
              image={image}
              width={115}
              height={115}
              border={50}
              borderRadius={100}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
              className="add-user-picture-picker"
              onImageChange={() => onChange(image)}
            />
          )}
          <div className="add-user-picture-text">
            <p>Tämä kuva näkyy muille.</p>
            <p>Voit lisätä kuvan myös myöhemmin.</p>
          </div>
        </div>
      </main>
    </ShadowBox>
  )
}

Picture.propTypes = {
  image: PropTypes.instanceOf(Object),
  onChange: PropTypes.func.isRequired,
  hideStep: PropTypes.bool,
}

Picture.defaultProps = {
  hideStep: false,
  image: null,
}

export default memo(Picture)
