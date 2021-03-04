/* eslint-disable no-alert */
import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AvatarEditor from 'react-avatar-editor'
import Slider from 'rc-slider'
import ShadowBox from '../../ShadowBox'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'
import 'rc-slider/assets/index.css'
import ImageUploader from '../../ImageUploader'

const Picture = props => {
  const { onChange, hideStep } = props
  const [showFileLoader, setShowFileLoader] = useState(true)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })
  const [imageFile, setImageFile] = useState(null)
  const [imageUploaded, setImageUploaded] = useState(false)

  const editorRef = React.createRef()

  const closePreview = () => {
    onChange(null)
    setScale(1)
    setRotation(0)
    setShowFileLoader(true)
    setPosition({ x: 0.5, y: 0.5 })
    setImageUploaded(false)
  }

  const handlePositionChange = pos => {
    setPosition(pos)
  }

  const handleScale = value => {
    setScale(parseFloat(value))
  }

  const handleScaleByDirection = (direction, value) => {
    if (direction === 'down' && scale === 1) {
      setScale(1)
    } else if (direction === 'up' && scale === 3) {
      setScale(3)
    } else {
      setScale(parseFloat(value))
    }
  }

  const handleRotate = () => {
    const newRotation = rotation + 90
    setRotation(newRotation)
  }

  useEffect(() => {
    const saveAfterChange = () => {
      if (editorRef && editorRef.current) {
        const canvas = editorRef.current.getImageScaledToCanvas().toDataURL()
        onChange(canvas)
      }
    }
    saveAfterChange()
  }, [rotation, scale, imageUploaded, editorRef, onChange])

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
              onChange={setImageFile}
              setShowFileLoader={setShowFileLoader}
            />
          ) : (
            <div className="image-preview-container">
              <ButtonContainer
                className="icon-btn close-preview-button"
                onClick={closePreview}
                label="Sulje"
              >
                <i className="fas fa-times" />
              </ButtonContainer>
              <AvatarEditor
                ref={editorRef}
                image={imageFile}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                color={[255, 255, 255, 0.8]} // RGBA
                scale={parseFloat(scale)}
                rotate={parseFloat(rotation)}
                position={position}
                onPositionChange={handlePositionChange}
                className="add-user-picture-picker"
                onImageReady={() => setImageUploaded(true)}
              />

              <div className="controls-button-container">
                <ButtonContainer
                  className="icon-btn rotate-btn"
                  onClick={handleRotate}
                  label="Käännä"
                >
                  <i className="fas fa-retweet" />
                </ButtonContainer>
                <br />
                <div className="zoom-controls-container">
                  <ButtonContainer
                    className="icon-btn"
                    onKeyPress={
                      () => handleScaleByDirection('down', scale - 0.02)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    onClick={() => handleScaleByDirection('down', scale - 0.02)}
                    label="Pienennä"
                  >
                    <i className="fas fa-minus zoom-control-sign" />
                  </ButtonContainer>
                  <Slider
                    defaultValue={1}
                    ariaLabelForHandle="zoom"
                    tabIndex={0}
                    handleStyle={{
                      borderColor: 'gray',
                      height: 20,
                      width: 20,
                      marginLeft: 10,
                      marginRight: 10,
                      backgroundColor: 'white',
                    }}
                    railStyle={{
                      height: 15,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                    trackStyle={{
                      height: 15,
                      marginLeft: 10,
                      marginRight: 10,
                      backgroundColor: 'gray',
                    }}
                    value={scale}
                    onChange={handleScale}
                    min={1}
                    max={3}
                    step={0.01}
                  />
                  <ButtonContainer
                    className="icon-btn"
                    onKeyDown={() => handleScaleByDirection('up', scale + 0.02)}
                    onClick={() => handleScaleByDirection('up', scale + 0.02)}
                    label="Suurenna"
                  >
                    <i className="fas fa-plus zoom-control-sign" />
                  </ButtonContainer>
                </div>
                <br />
              </div>
            </div>
          )}
          <div className="add-user-picture-text">
            <p className="add-user-topmost-text">Tämä kuva näkyy muille.</p>
            <p>Voit lisätä kuvan myös myöhemmin.</p>
          </div>
        </div>
      </main>
    </ShadowBox>
  )
}

Picture.propTypes = {
  onChange: PropTypes.func.isRequired,
  hideStep: PropTypes.bool,
}

Picture.defaultProps = {
  hideStep: false,
}

export default memo(Picture)
