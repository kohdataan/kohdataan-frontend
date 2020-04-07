import React, { memo } from 'react'
import './styles.scss'

const AccessibilityStatement = () => {
  return (
    <div id="create-account-modal-container">
      <div className="accesibility-statement-modal-content">
        <h1 className="service-info-header">Saavutettavuus&shy;seloste</h1>
        <div className="service-info-content">
          <article>
            <section>
              <h2 className="service-info-list-item">Saavutettavuusselosteesta</h2>
              <p>Tänne tulee palvelun saavutettavuusseloste.</p>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}

export default memo(AccessibilityStatement)
