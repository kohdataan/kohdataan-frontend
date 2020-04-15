import React, { useState } from 'react'
import CookieConsentBanner from '../components/CookieConsentBanner'

const CookieContainer = () => {
  const [showModal, setShowModal] = useState(true)

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="cookie-banner-container">
      <CookieConsentBanner modalIsOpen={showModal} closeModal={closeModal} />
    </div>
  )
}

export default CookieContainer
