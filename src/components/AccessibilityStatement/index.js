import React, { memo } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const AccessibilityStatement = ({ closeModal }) => {
  return (
    <div className="accessibility-statement-modal-container">
      <div className="accesibility-statement-modal-content">
        <div className="accessibility-statement-header-content">
          <h1 className="accessibility-statement-header">
            Saavutettavuus&shy;seloste
          </h1>
          <ButtonContainer
            className="accessibility-statement-icon-btn"
            onClick={closeModal}
            label="Sulje"
          >
            <div className="go-back-button" />
          </ButtonContainer>
        </div>
        <p className="bold-text">(voimassa 27.4.2020 alkaen)</p>
        <div className="service-info-content">
          <p>
            Tämä on <span className="uppercase-text">Kohdataan</span>
            -palvelun saavutettavuusseloste.
          </p>
          <h2 className="accessibility-statement-headline">
            Mitä tarkoittavat saavutettavuus ja saavutettavuusseloste?
          </h2>
          <p>Saavutettavuusseloste kertoo verkkopalvelun saavutettavuudesta.</p>
          <p>
            Saavutettavaa verkkopalvelu on sellainen, jota voivat käyttää
            mahdollisimman monet ihmiset. Saavutettavaa verkkopalvelua voivat
            siis käyttää myös ihmiset, joilla on jokin vamma tai
            toimintarajoite. Esimerkiksi näkövamma, kuulovamma, liikuntavamma
            tai kehitysvamma ei estä palvelun käyttöä, jos palvelu on tehty
            hyvin ja saavutettavasti.
          </p>
          <p>
            <span className="uppercase-text">Kohdataan</span>
            -palvelussa monet asiat on tehty hyvin ja saavutettavasti, mutta
            joitakin asioita voidaan vielä parantaa.
          </p>
          <h2 className="accessibility-statement-headline">
            <span className="uppercase-text">Kohdataan</span>
            -palvelun saavutettavuus 
          </h2>
          <p>
            <span className="uppercase-text">Kohdataan</span>
            -palvelua koskee laki digitaalisten palvelujen tarjoamisesta. Lain
            mukaan julkisilla varoilla rahoitettujen verkkopalvelujen täytyy
            olla saavutettavia.
          </p>
          <p>
            <a
              href="https://kohdataan.fi/saannot/"
              className="service-info-link"
            >
              Siirry lakiin tästä.
            </a>
          </p>
          <p>
            <span className="uppercase-text">Kohdataan</span>
            -palvelu täyttää kriittiset saavutettavuusvaatimukset WCAG 2.1
            -kriteerien mukaan. Palvelun saavutettavuuden on arvioinut
            Kehitysvammaliiton asiantuntija.
          </p>
          <h2 className="accessibility-statement-headline">
            Sisällöt, jotka eivät ole vielä saavutettavia
          </h2>
          <h3 className="accessibility-statement-headline">
            Saavutettavuuspuutteet:
          </h3>
          <p>
            Ruudunlukuohjelman käyttäjä ei saa varmistusta siitä, että profiili-
            ja rekisteröitymistietoja on muokattu onnistuneesti.  
          </p>
          <h3 className="accessibility-statement-headline">
            Saavutettavuusvaatimukset, jotka eivät täyty:
          </h3>
          <p>4.1.3 Tilasta kertovat viestit</p>
          <h3 className="accessibility-statement-headline">
            Syy noudattamatta jättämiselle: 
          </h3>
          <p>
            Palvelun kaikkia ominaisuuksia ei ole vielä toteutettu. Puute
            korjataan mahdollisimman pian.
          </p>
          <h2 className="accessibility-statement-headline">
            Sisältö, joka ei kuulu lainsäädännön piiriin 
          </h2>
          <p>
            Käyttäjien tuottama tai jakama sisältö ei kuulu lainsäädännön
            piiriin. Tällaisia sisältöjä ovat esimerkiksi viesteissä olevat
            tekstit, kuvat, videot tai ääniviestit. Nämä sisällöt eivät
            välttämättä ole saavutettavia.
          </p>
          <h2 className="accessibility-statement-headline">Anna palautetta</h2>
          <p>
            Jos huomaat 
{' '}
<span className="uppercase-text">Kohdataan</span>
            -palvelun saavutettavuudessa ongelmia, anna meille palautetta. Voit
            antaa palautetta saavutettavuudesta sähköpostitse
            kohdataan@kohdataan.fi. Vastaamme palautteeseen kahden viikon
            aikana. Pyrimme jatkuvasti parantamaan
{' '}
            <span className="uppercase-text">Kohdataan</span>
            -palvelun saavutettavuutta.
          </p>
          <h2 className="accessibility-statement-headline">
            Saavutettavuuden valvonta 
          </h2>
          <p>
            Etelä-Suomen aluehallintovirasto valvoo saavutettavuusvaatimusten
            toteutumista. Jos olet laittanut meille saavutettavuuspalautetta,
            mutta et ole tyytyväinen vastaukseen tai et saa vastausta 14 päivän
            aikana, voit antaa palautetta Etelä-Suomen aluehallintovirastoon.
            Aluehallintoviraston sivulla kerrotaan, miten palautetta annetaan ja
            miten se käsitellään.
          </p>
          <p>
            <a
              href="https://kohdataan.fi/saannot/"
              className="service-info-link"
            >
              Siirry aluehallintoviraston ohjeisiin tästä.
            </a>
          </p>
          <h2 className="accessibility-statement-headline">
            <span className="uppercase-text">Kohdataan</span>
            -palvelun yhteystiedot 
          </h2>
          <span>Sähköposti: kohdataan@kohdataan.fi</span>
          <br />
          <span>Puhelinnumero: 09 348 090 (vaihde)</span>
          <br />
          <h2 className="accessibility-statement-headline">
            Valvontaviranomaisen yhteystiedot 
          </h2>
          <span>Etelä-Suomen aluehallintovirasto</span>
          <br />
          <span>Saavutettavuuden valvonnan yksikkö</span>
          <br />
          <p>
            <a
              href="https://saavutettavuusvaatimukset.fi"
              className="service-info-link"
            >
              www.saavutettavuusvaatimukset.fi
            </a>
          </p>
          <span>Sähköposti: saavutettavuus@avi.fi</span>
          <br />
          <span>Puhelinnumero: 02 9501 6000</span>
          <br />
        </div>
      </div>
      <ButtonContainer
        className="profile-modal-button accessibility-statement-modal-button"
        onClick={closeModal}
      >
        Sulje
      </ButtonContainer>
    </div>
  )
}

AccessibilityStatement.propTypes = {
  closeModal: propTypes.func.isRequired,
}

export default memo(AccessibilityStatement)
