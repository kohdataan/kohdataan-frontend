import React, { memo, useState } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import ModalContainer from '../ModalContainer'
import './styles.scss'

const ServiceRules = ({ setRulesAccepted, setOpenErrorModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setOpenErrorModal(true)
    setModalIsOpen(false)
  }

  const acceptRules = () => {
    setRulesAccepted(true)
    setModalIsOpen(false)
  }

  return (
    <div className="create-account-modal-container">
      <div className="service-rules-content">
        <ButtonContainer className="accept-rules-link" onClick={openModal}>
          Hyväksy palvelun käyttöehdot
        </ButtonContainer>
        <ModalContainer
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          label="Hyväksy käyttösäännöt-dialogi"
          aria={{
            labelledby: 'Hyväksy käyttösäännöt-dialogi',
            modal: true,
          }}
        >
          <article className="service-rules-content">
            <ButtonContainer
              className="accept-rules-icon-btn icon-btn"
              onClick={closeModal}
              label="Sulje"
            >
              <div className="go-back-button" />
            </ButtonContainer>
            <h1 className="service-info-header">Käyttöehdot</h1>
            <div className="service-info-content">
              <section>
                <p>
                  Nämä käyttöehdot ovat sinun ja Kehitysvammaliiton välinen
                  sopimus <span className="uppercase-text">Kohdataan</span>
                  -palvelun käytöstä.
                </p>
                <p>
                  Lue ehdot huolellisesti läpi. Jos haluat käyttää palvelua,
                  sinun täytyy ensin hyväksyä nämä ehdot. Voit hyväksyä ehdot
                  tämän tekstin lopussa.
                </p>
                <p>
                  Jos haluat kysyä käyttöehdoista, voit lähettää sähköpostia
                  osoitteeseen kohdataan@kohdataan.fi.
                </p>
              </section>
              <section>
                <ol className="service-info-list">
                  <li>
                    <h2 className="service-info-list-item">
                      1. Mikä on{' '}
                      <span className="uppercase-text">Kohdataan </span>
                      -palvelu?
                    </h2>
                    <p>
                      {' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelu on sosiaalisen median palvelu, jossa voit
                      tutustua uusiin ihmisiin. Voit keskustella palvelussa
                      muiden käyttäjien kanssa ryhmissä tai kahdestaan. Voit
                      viestiä palvelussa kirjoittamalla, kuvilla, videoilla ja
                      ääniviesteillä.
                    </p>
                    <p>
                      {' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelu on ilmainen, kotimainen ja turvallinen palvelu.
                      Palvelua moderoidaan eli keskusteluista poistetaan
                      asiattomat sisällöt. Valvojaan saa tarvittaessa ja valvoja
                      pyrkii vastaamaan viesteihin mahdollisimman mahdollisimman
                      pian.
                    </p>
                  </li>
                </ol>
              </section>
            </div>
            <ButtonContainer
              className="profile-modal-button accept-rules-modal-button"
              onClick={acceptRules}
            >
              Hyväksy
            </ButtonContainer>
          </article>
        </ModalContainer>
      </div>
    </div>
  )
}

ServiceRules.propTypes = {
  setRulesAccepted: propTypes.func.isRequired,
  setOpenErrorModal: propTypes.func.isRequired,
}

export default memo(ServiceRules)
