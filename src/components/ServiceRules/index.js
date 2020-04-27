import React, { memo, useState } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import ModalContainer from '../ModalContainer'
import PrivacyPolicy from '../PrivacyPolicy'
import './styles.scss'

const ServiceRules = ({ setRulesAccepted, setOpenErrorModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [privacyPolicyModalIsOpen, setPrivacyPolicyModalIsOpen] = useState(
    false
  )

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
          isLong
          aria={{
            labelledby: 'Hyväksy käyttösäännöt-dialogi',
            modal: true,
          }}
        >
          <div className="service-rules-content">
            <div className="service-rules-header-content">
              <h1 className="service-info-header">Käyttöehdot</h1>
              <ButtonContainer
                className="accept-rules-icon-btn"
                onClick={closeModal}
                label="Sulje"
              >
                <div className="go-back-button" />
              </ButtonContainer>
            </div>
            <p className="bold-text">(voimassa 27.4.2020 alkaen)</p>
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
                  osoitteeseen{' '}
                  <a
                    className="email-link"
                    href="mailto:kohdataan@kohdataan.fi"
                  >
                    kohdataan@kohdataan.fi
                  </a>
                  .
                </p>
              </section>
              <section>
                <ol className="service-info-list">
                  <li>
                    <span className="service-info-list-item">
                      Mikä on <span className="uppercase-text">Kohdataan</span>
                      -palvelu?
                    </span>
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
                      asiattomat sisällöt. Valvojaan saa tarvittaessa yhteyden,
                      ja valvoja pyrkii vastaamaan viesteihin mahdollisimman
                      pian.
                    </p>
                  </li>
                  <li>
                    <span className="service-info-list-item">
                      <span className="uppercase-text">Kohdataan </span>
                      -palvelun ikäraja ja muut vaatimukset
                    </span>
                    <p>
                      {' '}
                      Voit käyttää{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelua, jos olet vähintään 15-vuotias. Sinulla täytyy
                      olla toimiva sähköpostiosoite ja puhelinnumero. Palvelu on
                      ilmainen, mutta sinun täytyy itse maksaa omat laitteesi ja
                      internetyhteytesi.
                    </p>
                    <p>
                      {' '}
                      Voit rekisteröityä palveluun vain omilla, oikeilla
                      henkilötiedoilla. Palveluun ei saa ilmoittaa vääriä
                      henkilötietoja.
                    </p>
                  </li>
                  <li>
                    <span className="service-info-list-item">
                      Mitä vastuita meillä on?
                    </span>
                    <div className="list-item-content">
                      <p>
                        {' '}
                        Kehitysvammaliitto tarjoaa sinulle parhaan mahdollisen
{' '}
                        <span className="uppercase-text">Kohdataan</span>
                        -palvelun .
                      </p>
                      <p>
                        {' '}
                        <span className="uppercase-text">Kohdataan</span>
                        -palvelussa saattaa olla virheitä, ja se voi olla joskus
                        poissa käytöstä. Kehitysvammaliitto pyrkii korjaamaan
                        virheet niin, että ne haittaavat palvelun käyttöä
                        mahdollisimman vähän.
                      </p>
                      <p>
                        Kehitysvammaliitto ei ole vastuussa, jos
{' '}
                        <span className="uppercase-text">Kohdataan</span>
                        -palvelun käyttö aiheuttaa vahinkoja tai muita ongelmia,
                        esimerkiksi maksuja internetin käyttämisestä
                        puhelimella.
                      </p>
                      <p>
                        Kehitysvammaliitto ei ole vastuussa materiaaleista,
                        joita käyttäjät jakavat palvelussa.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="service-info-list-item">
                      Mitä vastuita sinulla on?
                    </span>
                    <p>
                      {' '}
                      Sinulla voi olla
{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelussa vain yksi käyttäjätili. Käyttäjätili aukeaa,
                      kun rekisteröidyt palveluun.
                    </p>
                    <p>
                      Käytät palvelua omalla vastuullasi. Olet vastuussa omasta
                      käyttäjätilistäsi. Älä kerro tai anna tilisi salasanaa
                      muille. Jos epäilet, että joku muu tietää salasanasi,
                      vaihda se heti uuteen. Voit myös ottaa yhteyttä meihin,
                      niin autamme sinua.
                    </p>
                    <p>
                      Olet vastuussa kaikesta materiaalista, jota jaat
{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelussa. Jaa vain materiaalia, johon sinulla on
                      oikeus. Älä jaa viestejä ja materiaaleja, jotka ovat
                      laittomia, asiattomia tai loukkaavia.
                    </p>
                    <p>
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelun säännöissä kerrotaan lisää, millaisia
                      materiaaleja kannattaa jakaa.
                    </p>
                    <p>
                      <a
                        href="https://kohdataan.fi/saannot/"
                        className="service-info-link"
                      >
                        Siirry Kohdataan-sivuilla oleviin sääntöihin.
                      </a>
                    </p>
                    <p>
                      Säännöt ovat osa Kehitysvammaliiton ja sinun välistä
                      sopimusta.
                    </p>
                  </li>
                  <li>
                    <span className="service-info-list-item">
                      Miten muut voivat käyttää materiaaliasi?
                    </span>
                    <p>
                      Kehitysvammaliitto ei käytä materiaalejasi mihinkään, ei
                      muokkaa, eikä jaa niitä eteenpäin. Sinulla säilyvät kaikki
                      tekijänoikeudet materiaaleihisi, joita jaat palvelussa.
                    </p>
                    <p>
                      Muiden käyttäjien kuvia ja materiaaleja ei saa kopioida
                      eikä jakaa eteenpäin. On kuitenkin mahdollista, että joku
                      muu jakaa palvelussa olevia materiaaleja eteenpäin ilman
                      lupaa. Me emme pysty estämään sitä teknisesti. Ilmoita
                      meille, jos huomaat, että materiaalejasi jaetaan
                      eteenpäin.
                    </p>
                  </li>
                  <li>
                    <span className="service-info-list-item">
                      Henkilötiedot ja yksityisyys
                    </span>
                    <div>
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelu kerää sinusta seuraavat henkilötiedot: 
                      <ul>
                        <li>
                          kun rekisteröidyt palvelun käyttäjäksi
                          <ul>
                            <li>etu-ja sukunimesi</li>
                            <li>syntymäaikasi</li>
                            <li>sähköpostiosoit&shy;teesi</li>
                            <li>puhelinnume&shy;rosi</li>
                            <li>luomasi salasana</li>
                          </ul>
                        </li>
                        <li>
                          kun luot käyttäjäprofiilin, joka näkyy muille
                          käyttäjille
                          <ul>
                            <li>kutsumanimesi</li>
                            <li>asuinpaikkasi</li>
                            <li>kuvasi</li>
                            <li>kuvauksen itsestäsi</li>
                            <li>kiinnostuksen kohteesi</li>
                          </ul>
                        </li>
                        <li>
                          keskusteluryhmiin tuottamasi materiaalit, kuten
                          tekstit, valokuvat, videot ja äänet.
                        </li>
                      </ul>
                    </div>
                    <p>
                      Yksityisyytesi on meille hyvin tärkeää. Keräämme sinusta
                      ainoastaan niitä tietoja, joita tarvitaan, että voit
                      käyttää <span className="uppercase-text">Kohdataan</span>
                      -palvelua ja saada meiltä viestejä.
                    </p>
                    <p>
                      Voit katsoa ja muokata omia tietojasi omassa profiilissasi
                      ja Rekisteröitymistiedot-osiossa. Jos tietosi muuttuvat,
                      käy muuttamassa ne Rekisteröitymistiedot-osiossa.
                    </p>
                    <p>
                      Kun käytät{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelua, hyväksyt samalla, että voimme tallentaa
                      evästeitä tietokoneellesi tai mobiililaitteellesi.
                    </p>
                    <p>
                      Henkilötietojen käsittelystä ja evästeiden käytöstä
                      kerrotaan lisää palvelun tietosuojaselosteessa.
                    </p>
                    <ButtonContainer
                      className="service-info-link"
                      role="link"
                      onClick={() => setPrivacyPolicyModalIsOpen(true)}
                    >
                      <span>Siirry tietosuojaselosteeseen.</span>
                    </ButtonContainer>
                    <ModalContainer
                      modalIsOpen={privacyPolicyModalIsOpen}
                      closeModal={() => setPrivacyPolicyModalIsOpen(false)}
                      isLong
                      label="Tietosuojaseloste"
                      aria={{
                        label: 'Tietosuojaseloste',
                        modal: true,
                      }}
                    >
                      <aside id="Tietosuojaseloste">
                        <PrivacyPolicy
                          closeModal={() => setPrivacyPolicyModalIsOpen(false)}
                        />
                      </aside>
                    </ModalContainer>
                  </li>
                  <br />
                  <li>
                    <span className="service-info-list-item">
                      Kuinka palvelun käyttö voi loppua?
                    </span>
                    <p>
                      Voit lopettaa
{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelun käytön ja poistaa käyttäjätilisi
                      Rekisteröitymistiedot-osiossa. Voit myös pyytää palvelun
                      valvojaa poistamaan käyttäjätilisi. Lähetä valvojalle
                      sähköpostia siitä sähköpostiosoitteesta, jota käytit, kun
                      rekisteröidyit palveluun.
                    </p>
                    <p>
                      Voit käyttää
{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelua vain, jos noudatat näitä käyttöehtoja. Jos et
                      noudata käyttöehtoja, Kehitysvammaliitto voi poistaa
                      käyttäjätilisi ja estää sinua avaamasta uutta
                      käyttäjätiliä.
                    </p>
                    <p>
                      Kun käyttäjätilisi poistetaan, käyttäjäprofiilisi ja
                      kaikki profiilitietosi poistuvat
{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelusta. Profiilitiedot poistuvat kaikissa
                      tilanteissa, silloin kun itse poistat käyttäjätilin ja
                      silloin kun me poistamme sen. Kaikki ryhmäkeskusteluissa
                      jakamasi viestit ja materiaalit säilyvät palvelussa.
                    </p>
                    <p>
                      Kehitysvammaliitolla on oikeus tehdä
{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palveluun muutoksia tai lopettaa koko palvelu. Jos
                      palvelu lopetetaan, Kehitysvammaliitto ilmoittaa siitä
                      sinulle sähköpostilla hyvissä ajoin etukäteen.  
                    </p>
                  </li>
                  <li>
                    <span className="service-info-list-item">
                      Miten näihin käyttöehtoihin voidaan tehdä muutoksia?
                    </span>
                    <p>
                      Kehitysvammaliitto voi muuttaa näitä käyttöehtoja ilman,
                      että ilmoittaa siitä sinulle etukäteen. Jos muutamme
                      käyttöehtojen sisältöä paljon, ilmoitamme sinulle
                      muutoksista sähköpostilla siihen sähköpostiosoitteeseen,
                      joka näkyy käyttäjätililläsi.
                    </p>
                    <p>
                      Jos jatkat
{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelun käyttöä, hyväksyt samalla uudet käyttöehdot. Jos
                      et hyväksy muutettuja ehtoja, et voi jatkaa palvelun
                      käyttöä ja voit poistaa käyttäjätilisi palvelusta.
                    </p>
                  </li>
                  <li>
                    <span className="service-info-list-item">
                      Miten riidat ratkaistaan?
                    </span>
                    <p>
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelu ja nämä käyttöehdot on tehty niin, että ne
                      noudattavat Suomen lakeja. Jos sinulle ja
                      Kehitysvammaliitolle tulee riita palvelusta ja sen
                      käytöstä, yritämme ensin sopia riidan yhdessä. Jos se ei
                      onnistu, riita ratkaistaan sinun kotipaikkasi
                      käräjäoikeudessa. Voit myös viedä riidan
                      kuluttajariitalautakuntaan, joka suosittelee, miten asia
                      kannattaa ratkaista. Ennen kuin viet riidan
                      kuluttajariitalautakuntaan, kannattaa pyytää apua oman
                      kunnan kuluttajaneuvojalta.
                    </p>
                  </li>
                  <li>
                    <span className="service-info-list-item">Ota yhteyttä</span>
                    <p>
                      Voit ottaa yhteyttä
{' '}
                      <span className="uppercase-text">Kohdataan</span>
                      -palvelun valvojiin aina, kun sinulla on kysyttävää tai
                      ongelmia palvelun käytössä.
                    </p>
                    <p>
                      Voit ottaa yhteyttä valvojiin palvelussa olevalla
                      lomakkeella tai sähköpostilla {' '} 
                      <a
                        className="email-link"
                        href="mailto:kohdataan@kohdataan.fi"
                      >
                        kohdataan@kohdataan.fi
                      </a>.
                    </p>
                  </li>
                </ol>
              </section>
              <section>
                <h2>Yhteystiedot</h2>
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
              </section>
            </div>
            <ButtonContainer
              className="profile-modal-button accept-rules-modal-button"
              onClick={acceptRules}
            >
              Hyväksy
            </ButtonContainer>
          </div>
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
