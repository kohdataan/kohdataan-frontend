import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const PrivacyPolicy = ({ closeModal }) => {
  return (
    <div className="privacy-policy-modal-container">
      <div className="privacy-policy-modal-content">
        <div className="privacy-policy-header-content">
          <h1 className="privacy-policy-header">Tietosuoja&shy;seloste</h1>
          <ButtonContainer
            className="privacy-policy-icon-btn"
            onClick={closeModal}
            label="Sulje"
          >
            <div className="go-back-button" />
          </ButtonContainer>
        </div>
        <p className="bold-text">(voimassa 27.4.2020 alkaen)</p>
        <div className="service-info-content">
          <p>
            Tämä on &nbsp;
            <span className="uppercase-text">Kohdataan</span>
            -palvelun tietosuojaseloste. Tietosuojaselosteessa kerrotaan, mitä
            henkilötietoja palvelussa käyttäjistä kerätään ja mitä
            henkilötiedoilla tehdään.
          </p>
          <ol className="service-info-list">
            <li>
              <span className="service-info-list-item">Rekisterinpitäjä</span>
              <div className="list-block-item">
                Kehitysvammaliitto ry
                <br />
                Linnoitustie 2 B
                <br />
                02600 Espoo
                <br />
                Y-tunnus: 0116608-8
                <br />
                Puhelin: (09) 348 090 (vaihde)
                <br />
              </div>
            </li>
            <li>
              <span className="service-info-list-item">
                Yhteyshenkilö rekisteriin liittyvissä asioissa
              </span>
              <div className="list-block-item">
                Nimi: Tanja Räsänen
                <br />
                Puhelin: 0400 675 674
                <br />
                Sähköposti: &nbsp;
                <a className="email-link" href="mailto:tanja.rasanen@kvl.fi">
                  tanja.rasanen@kvl.fi
                </a>
                <br />
                Voit kysyä yhteyshenkilöltä lisätietoa tästä selosteesta tai
                henkilötietojesi käytöstä.
                <br />
              </div>
            </li>
            <li>
              <span className="service-info-list-item">Tietosuojavastaava</span>
              <div className="list-block-item">
                Nimi: Marko Peltomäki
                <br />
                Puhelin: (09) 3480 9262
                <br />
                Sähköposti: &nbsp;
                <a className="email-link" href="mailto:marko.peltomaki@kvl.fi">
                  marko.peltomaki@kvl.fi
                </a>
                <br />
              </div>
            </li>
            <li>
              <span className="service-info-list-item">Rekisterin nimi</span>
              <p>
                <span className="uppercase-text">Kohdataan</span>
                -palvelun käyttäjärekisteri
              </p>
            </li>
            <li>
              <span className="service-info-list-item">
                Mihin tarkoituksiin rekisteriä käytetään?
              </span>
              <p>
                <span className="uppercase-text">Kohdataan</span>
                -palvelu on sosiaalisen median palvelu, jossa voi tutustua
                uusiin ihmisiin. Palvelussa voi keskustella muiden käyttäjien
                kanssa ryhmissä tai kahdestaan. Palvelussa voi viestiä
                kirjoittamalla, kuvilla, videoilla ja ääniviesteillä.
              </p>
              <p>
                Keräämme ja käsittelemme vain sellaisia henkilötietojasi, joita
                tarvitaan &nbsp;
                <span className="uppercase-text">Kohdataan</span>
                -palvelun käyttöön.
              </p>
              Käsittelemme ja käytämme henkilötietojasi, jotta voimme
              <ul>
                <li>tarjota sinulle palvelun</li>
                <li>kehittää palvelua</li>
                <li>ottaa yhteyttä ongelmatilanteissa</li>
                <li>
                  tiedottaa palvelun muutoksista, esimerkiksi käyttöehtojen
                  muutoksista
                </li>
                <li>markkinoida palvelua.</li>
              </ul>
              <p>
                Henkilötietojesi käyttö perustuu Kehitysvammaliiton ja sinun
                väliseen sopimukseen &nbsp;
                <span className="uppercase-text">Kohdataan</span>
                -palvelun käytöstä.
              </p>
              <p>
                Kehitysvammaliitolla voi myös olla niin kutsuttuja oikeutettuja
                etuja, joiden perusteella se voi käyttää henkilötietojasi.
                Tällaisia oikeutettuja etuja ovat mm. oikeus edistää palvelun
                käyttöä markkinoinnin avulla sekä oikeus selvittää mahdollisia
                väärinkäytöksiä ja muita ongelmatilanteita.
              </p>
            </li>
            <li>
              <span className="service-info-list-item">
                Minkälaisia tietoja rekisteri sisältää?
              </span>
              <div className="list-block-item">
                Kun rekisteröidyt palvelun käyttäjäksi, sinusta kerätään:
                <ul>
                  <li>etu-ja sukunimi</li>
                  <li>syntymäaika</li>
                  <li>sähköpostiosoite</li>
                  <li>puhelinnumero</li>
                  <li>salasana</li>
                </ul>
                <br />
                Kun luot käyttäjäprofiilin, joka näkyy muille käyttäjille,
                sinusta kerätään:
                <ul>
                  <li>kutsumanimi</li>
                  <li>asuinkunta</li>
                  <li>kuvaus itsestä</li>
                  <li>kuva itsestä</li>
                  <li>kiinnostuksen kohteet.</li>
                </ul>
                <br />
                Kun käytät palvelua sinusta kerätään:
                <ul>
                  <li>
                    lokitietoja, jotka sisältävät muun muassa tietokoneesi tai
                    mobiililaitteesi IP-osoitteen sekä laitteessa olevan
                    käyttöjärjestelmän ja selaimen
                  </li>
                  <li>
                    palvelun ryhmäkeskusteluihin kirjoittamasi tekstit ja muut
                    jakamasi materiaalit.
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <span className="service-info-list-item">
                Miten henkilötietoja kerätään?
              </span>
              <p>
                Keräämme henkilötietoja vain sinulta itseltäsi sekä evästeiden
                ja vastaavien teknologioiden avulla laitteistasi. Tietoja
                kerätään esimerkiksi silloin kun
              </p>
              <ul>
                <li>rekisteröidyt palveluun</li>
                <li>kirjaudut sisään palveluun</li>
                <li>luot tai muokkaat omaa profiiliasi</li>
                <li>muokkaat rekisteröitymistietojasi</li>
                <li>liityt ryhmiin</li>
                <li>keskustelet muiden käyttäjien kanssa</li>
                <li>liikut palvelussa sivuilta toiselle</li>
                <li>olet yhteydessä valvojiin ongelmatilanteissa.</li>
              </ul>
              <br />
            </li>
            <li>
              <span className="service-info-list-item">
                Miten henkilötietoja säilytetään ja suojataan?
              </span>
              <p>
                Henkilötiedot kerätään tietokantoihin ja lokitiedostoihin.
                Tietokannat, tiedostot ja niiden varmuuskopiot sijaitsevat
                lukituissa tiloissa ja ne on suojattu palomuureilla,
                salasanoilla sekä muilla teknisillä keinoilla. Tiedot
                sijaitsevat Suomessa.
              </p>
              <p>
                Tietoihin pääsevät vain ne Kehitysvammaliiton työntekijät,
                joiden työhön tietojen käsittely kuuluu. Lisäksi tietoihin
                pääsevät sellaiset henkilöt, joilta Kehitysvammaliitto ostaa
                palvelun kehittämistä tai ylläpitoa. Kaikilla näillä henkilöillä
                on velvollisuus pitää tiedot salassa. Tietoja ei siis saa kertoa
                kenellekään.
              </p>
              <p>
                Henkilötietoja säilytetään niin kauan kuin käyttäjällä on
                käyttäjätili sekä enintään yksi vuosi sen jälkeen.
                Henkilötietoja voidaan säilyttää kauemmin, jos se on
                perusteltua.
              </p>
            </li>
            <li>
              <span className="service-info-list-item">Evästeet</span>
              <p>
                <span className="uppercase-text">Kohdataan</span>
                -palvelussa käytetään evästeitä, jotta palvelu toimii ja sitä
                voi käyttää.
              </p>
              <p>
                Evästeet ovat pieniä, tietokoneesi tai mobiililaitteesi
                selaimelle tallennettavia tekstitiedostoja, jotka eivät
                vahingoita laitettasi. Evästeet tunnistavat tietokoneesi tai
                mobiililaitteesi, kun tulet palveluun ja liikut sen sisällä.
              </p>
              <p>
                <span className="uppercase-text">Kohdataan</span>
                -palvelun evästeiden avulla kerätään myös tietoa palvelun
                käytöstä ja kehitetään palvelua. Evästeiden avulla ei kerätä
                henkilötietojasi tai selaushistoriaasi.
              </p>
              <p>
                Tietokoneesi selaimen tai mobiililaitteen asetuksista voit
                hallita evästeiden käyttöä tai halutessasi estää ne kokonaan.
                Jos estät asetuksistasi evästeiden käytön kokonaan, et pysty
                käyttämään &nbsp;
                <span className="uppercase-text">Kohdataan</span>
                -palvelua.
              </p>
            </li>
            <li>
              <span className="service-info-list-item">
                Tietojen luovuttaminen ulkopuolisille tahoille tai siirtäminen
                EU:n tai ETA:n ulkopuolelle
              </span>
              <p>
                Henkilötietoja ei luovuteta ulkopuolisille tahoille eikä
                siirretä Euroopan unionin tai Euroopan talousalueen
                ulkopuolelle, jos se ei ole palvelun teknisen toteuttamisen
                vuoksi tarpeellista.
              </p>
              <p>
                Ulkopuoliset henkilöt saavat käyttää henkilötietoja
                Kehitysvammaliiton luvalla vain &nbsp;
                <span className="uppercase-text">Kohdataan</span>
                -palvelun kehittämiseen.
              </p>
              <p>
                Henkilötietoja voidaan kuitenkin luovuttaa eteenpäin, jos
                viranomainen tai laki vaatii.
              </p>
            </li>
            <li>
              <span className="service-info-list-item">
                Mitä oikeuksia rekisteröidyllä on omiin henkilötietoihinsa?
              </span>
              <p>Rekisteröitynä sinulla on oikeus:</p>
              <ul>
                <li>
                  tarkastaa, mitä henkilötietoja sinusta on tallennettu &nbsp;
                  <span className="uppercase-text">Kohdataan</span>
                  -palvelun rekisteriin
                </li>
                <li>saada virheellinen henkilötietosi korjattua</li>
                <li>
                  saada henkilötietosi poistettua rekisteristä, jos
                  Kehitysvammaliitolla ei ole enää perustetta jatkaa tietojen
                  käyttöä
                </li>
                <li>
                  peruuttaa mahdolliset suostumuksesi henkilötietojesi käyttöön
                </li>
                <li>vastustaa henkilötietojesi käyttöä</li>
                <li>rajoittaa henkilötietojesi käyttöä</li>
                <li>saada tietosi siirrettyä järjestelmästä toiseen</li>
                <li>vastustaa itseäsi koskevaa profilointia</li>
                <li>
                  tehdä valitus Kehitysvammaliiton toiminnasta
                  tietosuojavaltuutetun toimistoon.
                </li>
              </ul>
              Voit tehdä oikeuksiasi koskevan pyynnön ottamalla yhteyttä
              kohdassa 2 mainittuun yhteyshenkilöön.
            </li>
            <br />
            <li>
              <span className="service-info-list-item">
                Minkä maan lainsäädäntöä henkilötietojen käsittelyyn
                sovelletaan?
              </span>
              <p>
                <span className="uppercase-text">Kohdataan</span>
                -palvelun henkilörekisteriin ja siihen sisältyvien
                henkilötietojen käsittelyyn sovelletaan Suomen lainsäädäntöä
                sekä suoraan Suomessa sovellettavaa EU:n lainsäädäntöä, kuten
                EU:n tietosuoja-asetusta.
              </p>
            </li>
            <li>
              <span className="service-info-list-item">
                Miten voimme päivittää tätä tietosuojaselostetta?
              </span>
              <p>
                Kehitämme palveluamme ja toimintaamme jatkuvasti, ja sen takia
                myös henkilötietojen käsittelyyn voi tulla muutoksia. Päivitämme
                tarvittaessa tietosuojaselosteen vastaamaan muutoksia. Muutokset
                voivat perustua myös lainsäädännön muutoksiin. Suosittelemme,
                että tutustut tietosuojaselosteemme sisältöön säännöllisesti.
              </p>
              <p>
                Ilmoitamme sinulle, jos alamme käyttää henkilötietojasi muuhun
                tarkoitukseen kuin siihen, johon henkilötietosi kerättiin.
                Ilmoitamme asiasta ja uudesta tietosuojaselosteesta etukäteen.
                Jos tietosuojaselosteeseen tulee muita muutoksia, ilmoitamme
                niistä verkkosivuillamme.
              </p>
            </li>
          </ol>
        </div>
      </div>
      <ButtonContainer
        className="profile-modal-button privacy-policy-modal-button"
        onClick={closeModal}
      >
        Sulje
      </ButtonContainer>
    </div>
  )
}

PrivacyPolicy.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default memo(PrivacyPolicy)
