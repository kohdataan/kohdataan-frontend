import React, { memo } from 'react'
import './styles.scss'

const AccessibilityStatement = () => {
  return (
    <div id="create-account-modal-container">
      <div className="create-account-modal-content">
        <h2 className="create-account-modal-header">Saavutettavuusseloste</h2>
        <div className="create-account-modal-text">
          <p>Tänne tulee palvelun saavutettavuusseloste.</p>
        </div>
      </div>
    </div>
  )
}

export default memo(AccessibilityStatement)
