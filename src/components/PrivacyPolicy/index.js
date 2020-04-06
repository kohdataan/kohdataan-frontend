import React, { memo } from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="create-account-modal-container">
      <div className="create-account-modal-content">
        <h2 className="create-account-modal-header">Tietoturvaseloste</h2>
        <div className="create-account-modal-text">
          <p>Tänne tulee palvelun tietoturvaseloste.</p>
        </div>
      </div>
    </div>
  )
}

export default memo(PrivacyPolicy)