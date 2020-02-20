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
    console.log(e.target.files[0])
    const file = e.target.files[0]
    if (file && file.name) {
      EXIF.getData(file, function() {
        const exifData = EXIF.pretty(this)
        if (exifData) {
          console.log(exifData)
          const orientationTag = EXIF.getTag(this, 'Orientation')
          setImageData(orientationTag)
        } else {
          console.log(`No EXIF data found in image '${file.name}'.`)
        }
      })
    }
    console.log(' file ', file)
    if (e.target.files[0].size > 50000000) {
      alert('Tiedosto on liian suuri!')
      e.target.value = ''
    }
  }

  console.log('imageData ', imageData)
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

  const getOrientation = orientationTag => {
    let className
    switch (orientationTag) {
      case 2:
        className = 'flip'
        break
      case 3:
        className = 'rotate-180'
        break
      case 4:
        className = 'flip-and-rotate-180'
        break
      case 5:
        className = 'flip-and-rotate-270'
        break
      case 6:
        className = 'rotate-90'
        break
      case 7:
        className = 'flip-and-rotate-90'
        break
      case 8:
        className = 'rotate-270'
        break
      default:
        className = ''
      break
    }
    return className
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
            onCrop={onChange}
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
