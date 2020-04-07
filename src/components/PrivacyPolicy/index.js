import React, { memo } from 'react'
import './styles.scss'

const PrivacyPolicy = () => {
  return (
    <div className="create-account-modal-container">
      <div className="create-account-modal-content">
        <h1 className="service-info-header">Tietosuoja&shy;seloste</h1>
        <div className="service-info-content">
          <section>
            <article>
              <h2 className="info-list-item">Tietosuojaselosteesta</h2>
              <p>Tänne tulee palvelun tietosuojaaseloste.</p>
            </article>
          </section>
        </div>
      </div>
    </div>
  )
}

export default memo(PrivacyPolicy)
