/* eslint-disable no-alert */
import React, { memo } from 'react'
import Avatar from 'react-avatar-edit'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import './styles.scss'
import CameraIconPath from '../../../assets/camera-add-solid.svg'

const Picture = props => {
  const { onChange, hideStep } = props

  const onBeforeFileLoad = e => {
    if (e.target.files[0].size > 50000000) {
      alert('Tiedosto on liian suuri!')
      e.target.value = ''
    }
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
            className="add-user-picture-picker"
          />
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
  onChange: PropTypes.func.isRequired,
  hideStep: PropTypes.bool,
}

Picture.defaultProps = {
  hideStep: false,
}

export default memo(Picture)
