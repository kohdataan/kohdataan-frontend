/* eslint-disable no-alert */
import React, { memo, useState } from 'react'
import Avatar from 'react-avatar-edit'
import PropTypes from 'prop-types'
import EXIF from 'exif-js'
import ShadowBox from '../../ShadowBox'
import './styles.scss'
import CameraIconPath from '../../../assets/camera-add-solid.svg'

const Picture = props => {
  const { onChange, hideStep } = props
  const [imageData, setImageData] = useState(null)

  const onBeforeFileLoad = e => {
    // get Exif data for file if it exists.
    // Exif data is used to rotate the image to the correct orientation.
    const file = e.target.files[0]
    if (file && file.name) {
      EXIF.getData(file, function() {
        const exifData = EXIF.pretty(this)
        if (exifData) {
          const orientationTag = EXIF.getTag(this, 'Orientation')
          setImageData(orientationTag)
        }
      })
    }
    if (e.target.files[0].size > 50000000) {
      alert('Tiedosto on liian suuri!')
      e.target.value = ''
    }
  }

  const getOrientation = orientationTag => {
    let orientationValue
    switch (orientationTag) {
      case 3:
        orientationValue = 'rotate(180deg)'
        break
      case 6:
        orientationValue = 'rotate(90deg)'
        break
      case 8:
        orientationValue = 'rotate(270deg)'
        break
      default:
        orientationValue = 'rotate(0deg)'
        break
    }
    return orientationValue
  }

  function resetOrientation(srcBase64, srcOrientation, setImage) {
    const img = new Image()
    img.onload = function() {
      const { width } = img
      const { height } = img
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // set proper canvas dimensions before transform & export
      if (srcOrientation === 6 || srcOrientation === 9) {
        canvas.width = height
        canvas.height = width
      } else {
        canvas.width = width
        canvas.height = height
      }

      // transform context before drawing image
      switch (srcOrientation) {
        case 3:
          ctx.transform(-1, 0, 0, -1, width, height)
          break
        case 6:
          ctx.transform(0, 1, -1, 0, height, 0)
          break
        case 8:
          ctx.transform(0, -1, 1, 0, 0, width)
          break
        default:
          break
      }

      // draw image
      ctx.drawImage(img, 0, 0)

      // export base64
      setImage(canvas.toDataURL())
    }
    img.src = srcBase64
  }

  const onCrop = image => {
    if (image) {
      // resets orientation in base64 image
      resetOrientation(image, imageData, onChange)

      // changes orientation if necessary for preview canvas
      /* const styleToAdd = getOrientation(imageData)
      if (imageData) {
        const elems = document
          .getElementsByClassName('add-user-picture-content-container')[0]
          .getElementsByTagName('div')
        elems[0].style.transform = styleToAdd
        elems[0].style.marginTop = '30px'
      } */
    }
    return image
  }

  const onClose = () => {
    // resets image data and rotation values
    setImageData(null)
    const elems = document
      .getElementsByClassName('add-user-picture-content-container')[0]
      .getElementsByTagName('div')
    elems[0].style.transform = 'rotate(0deg)'
    elems[0].style.marginTop = '0px'
  }

  const customLabelStyle = {
    fontSize: '115',
    display: 'block',
    borderRadius: '50%',
    background: `url(${CameraIconPath})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '40%',
  }

  const customBorderStyle = {
    border: '1px solid #000000',
    borderStyle: 'solid',
    borderRadius: '50%',
    margin: '10px',
  }

  const imageContentClassList = [
    'add-user-picture-picker',
    getOrientation(imageData),
  ]

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
          <Avatar
            width={115}
            height={115}
            label="&nbsp;"
            labelStyle={customLabelStyle}
            borderStyle={customBorderStyle}
            onBeforeFileLoad={onBeforeFileLoad}
            onCrop={onCrop}
            onClose={onClose}
            className={imageContentClassList.join(' ')}
          />
          <div className="add-user-picture-text">
            <p>Tämä kuva näkyy muille.</p>
            <p>Voit lisätä kuvan myös myöhemmin.</p>
            <p>
              Kuva voi olla formaateissa BMP, JPG tai PNG. Tiedoston maksimikoko
              on 50MB.
            </p>
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
