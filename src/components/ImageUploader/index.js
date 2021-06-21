import React, { memo, useState } from 'react'
import propTypes from 'prop-types'
import ModalContainer from '../ModalContainer'
import ButtonContainer from '../ButtonContainer'
import CameraIconPath from '../../assets/camera-add-solid.svg'
import './styles.scss'

const ImageUploader = (props) => {
  const { onChange, setShowFileLoader } = props
  const [openModal, setOpenModal] = useState(false)

  const fileInput = React.createRef()

  const onBeforeFileLoad = (e) => {
    if (e.target.files[0].size > 50000000) {
      setOpenModal(true)
      e.target.value = ''
    }
  }

  const customIconStyle = {
    fontSize: '115',
    width: '130px',
    height: '130px',
    display: 'block',
    textAlign: 'center',
    border: '1px solid #000000',
    borderStyle: 'solid',
    borderRadius: '50%',
    margin: '10px',
    background: `url(${CameraIconPath})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '40%',
  }

  const uploadFile = (e) => {
    e.preventDefault()
    onBeforeFileLoad(e)
    if (!e.target.value) return

    const file = e.target.files[0]
    onChange(file)

    setShowFileLoader(false)
  }

  const clickFileInput = () => {
    fileInput.current.click()
  }

  return (
    <div>
      <div className="upload-file-container">
        <input
          onChange={(e) => uploadFile(e)}
          name="image-upload"
          id="image-upload"
          type="file"
          accept="image/*"
          className="input-content"
          ref={fileInput}
        />
        <ButtonContainer
          className="icon-btn"
          onClick={clickFileInput}
          label="Lisää kuva"
          ariaDescribedby="picture-info"
        >
          <div style={customIconStyle}>&nbsp;</div>
        </ButtonContainer>
      </div>

      <ModalContainer
        modalIsOpen={openModal}
        label="Tiedosto on liian suuri"
        closeModal={() => setOpenModal(false)}
      >
        <div>
          <p className="image-max-size-exceeded-text">
            Tiedosto on liian suuri!
          </p>
          <ButtonContainer
            className="icon-btn go-back-button image-max-size-exceeded"
            onClick={() => setOpenModal(false)}
            label="Sulje"
          />
        </div>
      </ModalContainer>
    </div>
  )
}

ImageUploader.propTypes = {
  onChange: propTypes.func.isRequired,
  setShowFileLoader: propTypes.func.isRequired,
}

export default memo(ImageUploader)
