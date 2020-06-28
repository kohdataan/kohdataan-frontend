[![CircleCI](https://circleci.com/gh/kohdataan/kohdataan-frontend.svg?style=svg)](https://circleci.com/gh/kohdataan/kohdataan-frontend)
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors)
[![Maintainability](https://api.codeclimate.com/v1/badges/9f187f6eae1c08f7f7be/maintainability)](https://codeclimate.com/github/kohdataan/kohdataan-frontend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9f187f6eae1c08f7f7be/test_coverage)](https://codeclimate.com/github/kohdataan/kohdataan-frontend/test_coverage)

# Somettamalla uutta kohtaamista -frontend

## Projektin tausta ja tavoitteet

Projektissa kehitämme ja toteutamme yhdessä uutta saavutettavaa somepalvelua, jossa on helppo tutustua uusiin ihmisiin.

Tavoitteena on luoda palvelu, jossa on turvallinen ja myönteinen ilmapiiri, jossa ketään ei kiusata, ja jossa ketään ei jätetä yksin. Palvelussa tuetaan kohtaamista ja vuorovaikutusta, jotta kaikilla olisi mahdollisuus tutustua omanhenkisiin ihmisiin, ja myös ylläpitää kaverisuhteitaan.

Palvelu on avoin kaikille yli 15-vuotiaille nuorille ja aikuisille. Palvelun toteutuksessa otetaan huomioon käyttäjien erilaiset tarpeet saavutettavuuden ja helppokäyttöisyyden osalta, ja palvelussa voi myös viestiä erilaisin keinoin. Palvelun alusta toteutaan Web-sovelluksena, ensisijaisesti mobiililaitteille, mutta sovellusta tulee voida käyttää myös muilla laitteilla.

Palvelu ja sen tekninen yhteiskehittäminen liittyy Somettamalla uutta kohtaamista eli [Kohdataan-hankkeeseen](https://kohdataan.fi/), jossa tavoitteena on yksinäisyyden vähentäminen somen keinoin.

Palvelun kehittäminen käynnistettiin keväällä 2018 Kohdataan-hackathonissa, jossa haastettiin eri alojen osaajia innovoimaan ja ideoimaan tulevaisuuden somepalvelua. Ideoista on työstetty yhdessä käyttäjien ja kumppaneiden kanssa konsepti, jonka kehittämistä ja toteuttamista on jatkettu keväällä 2019. Palvelu julkaistaan syksyllä 2019.

Palvelun toteutuksessa keskeistä on käyttäjälähtöisyys. Myös tekniseen toteutukseen on luotu yhteiskehittämisen malli, jossa palvelua kehitetään yhteistyössä paitsi käyttäjien, myös kaikkien palvelusta kiinnostuneiden ohjelmistokehittäjien ja muiden osaajien kanssa. Avoimuus ja yhdessä tekeminen, samoin uusien toimintatapojen kokeileminen on koko hankkeen ytimessä. Yhteiskehittämisestä saadaan myös tärkeää lisäresurssia palvelun toteutukseen.

Kohdataan-hanke on [Kehitysvammaliiton](https://www.kehitysvammaliitto.fi/) ja [Mielenterveysseuran](https://www.mielenterveysseura.fi/) yhteishanke.

Hanketta rahoittaa Sosiaali- ja terveysjärjestöjen avustuskeskus [STEA](https://www.stea.fi/).

Teknisenä kumppanina ja yhteiskehittämisen koordinaattorina hankkeessa toimii [Perfektio](https://www.perfektio.fi/).

## Projektin asennus ja kehitysympäristön pystytys

### Frontend

Saat frontendin kehitysympäristön pystyyn ajamalla seuraavat komennot:

```bash
git clone https://github.com/kohdataan/kohdataan-frontend.git
cd kohdataan-frontend
npm install
npm start
```

Ympäristömuuttujat voi tallentaa esim. .env tiedostoon seuraavalla tyylillä:

```
REACT_APP_MATTERMOST_USERNAME = "example@example.fi"
REACT_APP_MATTERMOST_PASSWORD = "examplePassword"
REACT_APP_MATTERMOST_URL = "localhost:9090"
REACT_APP_NODE_BACKEND_URL = "http://localhost:9090/node_api"
```

Tässä oletetaan, että backend on lokaalisti pystyssä, ja sinne on luotu käyttäjä vastaavilla tunnuksilla. Kunnes kirjautumis- ja rekisteröitymistoiminnallisuudet valmistuvat, tarvitaan siis valmiiksi luotu mattermost-käyttäjä. Käyttäjiä voi toistaiseksi luoda joko mattermost-käyttöliittymän avulla avaamalla selaimessa http://localhost:9090, tai suoraan mattermost apin:n kautta. Kehityksen tukena voi hyvin muutenkin hyödyntää mattermostin omaa käyttöliittymää, ja varmistaa että Kohdataan-käyttöliittymä toimii oletetusti.

### Tunnukset testaamiseen

## Dokumentaatio ja arkkitehtuuri

![Kohdataan arkkitehtuuri](https://github.com/kohdataan/kohdataan-backend/blob/master/documentation/kohdataan-architecture.png?raw=true 'Kohdataan arkkitehtuuri')

## Ulkoasu

Projektin ulkoasu ja tyyliohjeet löytyvät osoitteesta https://app.zeplin.io/project/5cb591097f5deba21424eb89/
Palvelun toiminnasta saa kiinni prototyypin avulla: https://invis.io/AYRCBXKH2R4 

Tutustuaksesi designiin sinun täytyy rekisteröityä Zeplinin käyttäjäksi. Rekisteröitymisen jälkeen sinulla on pääsy ajantasaiseen näkymäkohtaiseen designiin. Projektin issueista linkataan suoraan yksittäisten näkymien designiin, jotta pääset helposti kiinni tekemiseen ulkoasunkin puolesta. Pyrimme liittämään myös screenshotin niihin issueihin, joihin liittyy suoraan jokin näkymä.

Tämänhetkiset näkymät sekä käytetyt ikonit löytyvät myös kootusti assets-repositoriosta: https://github.com/kohdataan/kohdataan-assets 

## Projektiin osallistuminen

### Backlog ja kehityksen kulku

Jos haluat osallistua projektin toteutukseen, valitse [projektin työlistalta](https://github.com/orgs/kohdataan/projects/1) backlog-sarakkeesta kiinnostavan kuuloinen ominaisuus (jota ei ole assignattu jollekin muulle), assignaa se itsellesi ja siirrä se työlistalla "In progress"-sarakkeeseen. Projektin työlista koostuu hankkeen henkilökunnan ja teknisen toteutuskumppanin yhdessä suunnittelemista ominaisuuksista ja projektista löytyneistä bugeista. Kun aloitat ominaisuuden kehittämisen tai bugin korjauksen, tee kehitystyö omassa feature-branchissa, jonka nimeät muotoon `/<backend/frontend>/<issuen numero>/<lyhyt kuvaus issuen/issuen otsikko>`, esimerksi `/backend/2/LoginEndpoints`.

Hanketiimi huolehtii, että projektin työlistalla on jatkuvasti runsaasti priorisoitua ja hyvin määriteltyä tekemistä eri tasoisille ja osaamistaustaisille ohjelmistokehittäjille.

### Kommunikaatio

Projektiin liittyvä kommunikaatio tapahtuu [Kohdataan Development Slackissa](https://kohdataan-dev.slack.com/). Rekisteröidyttyäsi voit kysyä mitä tahansa projektiin liittyvää, hanketiimi vastailee kysymyksiin aktiivisesti ja auttaa mielellään alkuun projektin kanssa!

Slackin lisäksi projektiin liittyvää kommunikaatiota on myös GitHubissa Pull Requestien ja Issueiden osalta. Pidäthän näihin liittyvän keskustelun kommentteina GitHubissa.

### Lähdekoodin tyyliohjeet

Projektissa on käytössä [ESLint](https://github.com/eslint/eslint) ja [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) pienin muutoksin.

#### Frontend

Noudata containereiden ja componentien hierarkiassa [tätä ohjetta](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

Projektissa on käytössä SASS, jokaiselle komponentille on oma .scss-tiedostonsa komponentin kansiossa.

### Mattermost-redux

Projektissa hyödynnetään [Mattermostin](https://mattermost.com/) backendia chat-toiminnallisuuksien toteuttamisessa. Lisäksi Mattermost-integraatioiden ja sovellusten hyödynnettäväksi on vapaassa käytössä myös reduxiin pohjautuva [mattermost-redux](https://github.com/mattermost/mattermost-redux), joka tarjoaa valmiina suurimman osan tarvittavista actioneista chattiin liittyvän datan käsittelyä varten. Jos reduxin periaatteet eivät ole jo valmiiksi tuttuja, kannattaa ensin käydä tutustumassa niihin.

Mattermost-redux on lisätty valmiiksi tähän projektiin. Kun toteutat mitä tahansa keskusteluihin ja etenkin keskusteludataan liittyviä toiminnallisuuksia, hyvä lähtökohta on aluksi tarkistaa mattermost-reduxin olemassa olevat actionit, sillä usein kaikki tarvittava löytyy valmiina, eikä tällöin ole syytä luoda omia actioneita näiden lisäksi. Kaikki valmiina olevat actionit löytyvät mattermost-reduxin [lähdekoodista](https://github.com/mattermost/mattermost-redux/tree/master/src/actions). Valitettavasti näitä ei ole dokumentoitu lähdekoodin lisäksi muualle. Joitakin hyödyllisiä vinkkejä voi löytyä myös tutkimalla [Mattermost API-kuvausta](https://api.mattermost.com/). Näitä rajapintoja ei tosin suoraan ole syytä hyödyntää, sillä vastaavat toiminnot löytyvät myös suoraan actioneina. Käytännössä ainakin `users.js`, `groups.js`, `posts.js`, `websockets.js` ja `channels.js` tiedostoista löytyy tämän projektin kannalta hyödyllisiä actioneita, joita voit suoraan ottaa käyttöön:

```
import { login } from 'mattermost-redux/actions/users'
```

Tämän jälkeen actionit voidaan yhdistää komponentin propseihin tuttuun tyyliin, käyttämällä connectia:

```
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(App)
```

Selaimeen kannattaa lisätä esimerkiksi [React Developer Tools](https://github.com/facebook/react-devtools), jonka avulla storen tilaa on helpompi pitää silmällä kehitysvaiheessa. Mattermost-reduxissa on actioneiden lisäksi valmiina paljon selectoreja, jotka kannattaa käydä läpi. Niitä kannattaa myös hyödyntää mahdollisuuksien mukaan ennen omien toteuttamista. Selectorit löytyvät mattermost-reduxin kansiosta [selectors](https://github.com/mattermost/mattermost-redux/tree/master/src/selectors) ja reducerit puolestaan kansiosta [reducers](https://github.com/mattermost/mattermost-redux/tree/master/src/reducers). Lisäksi storen hahmottamisessa auttaa [initial_state.js](https://github.com/mattermost/mattermost-redux/blob/master/src/store/initial_state.js).

Keskusteluun liittyvät toiminnallisuudet ovat kuitenkin vain yksi osa kohdataan-palvelua, joten aivan kaikkea ei löydy valmiina mattermost-reduxista. Esimerkiksi käyttäjäprofiiliin ja päivän kysymyksiin liittyvä toiminnallisuus on osittain tai kokonaan mattermostin ulkopuolella, joten näihin liittyvän tilan käsittelyyn on tarkoituksenmukaista luoda omat actionit tarvittaessa.

### Saavutettavuus ja sen testaaminen

#### Yleistä saavutettavuudesta

Toteutuksen osalta tässä projektissa tavoiteltu lopputulos on sosiaalisen median alusta, jolla voit tutustua uusiin ihmisiin turvallisesti ja saavutettavasti. Alusta toteutaan Web-sovelluksena, ensisijaisesti mobiililaitteille, mutta sovellusta tulee voida käyttää myös muilla laitteilla. Saavutettavuuden ja helppokäyttöisyyden osalta keskeistä on käyttäjien erilaisten tarpeiden huomioiminen.

Kattava saavutettavuuden testaus ja arviointi ovat siis luonnollisesti osa projektin tavoitteiden saavuttamisessa. Projektissa noudatetaan [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)-saavutettavuusstandardia, ja siksi jokaisen frontendin tekemiseen osallistuvan on hyvä tutustua saavutettavuuden periaatteisiin.

WCAG 2.1 on käytössä myös saavutettavuutta koskevan lainsäädännön pohjana. Yhdenvertaisuuslaki ja syksyllä 2018 voimaan tullut EU:n saavutettavuusdirektiivi velvoittaa kaikkia julkisen sektorin toimijoita tekemään verkkopalveluistaan ja mobiilisovelluksistaan saavutettavia. On hyvä muistaa, että kyse ei ole vain laista tai säädöksistä, vaan aivan arkipäiväisestä saavutettavuudesta ja käytettävyydestä joista hyötyvät kaikki.

Verkkosisällön saavutettavuusohjeet (WCAG 2.1) suomeksi:

- [Rakenne ja käyttö](http://papunet.net/saavutettavuus/wcag-21n-rakenne-ja-kaytto)
- [Ohjeet](http://papunet.net/saavutettavuus/wcag-21-ohjeet)

On myös hyvä tiedostaa, että WCAG-ohjeistuksella ei pystytä ratkaisemaan kaikkia saavutettavuuden ongelmia. Projektin saavutettavuun ja käytettävyyteen liittyviä kysymyksiä voi esittää myös [Kohdataan Development Slackissa](https://kohdataan-dev.slack.com/).

Yleistä ja ajantasaista tietoa saavutettavuudesta löydät mm. Papunetistä:

- [Miksi saavutettava?](http://papunet.net/saavutettavuus/miksi-saavutettava)
- [Lait ja standardit](http://papunet.net/saavutettavuus/lait-ja-standardit)
- [Ohjeita ja oppaita](http://papunet.net/saavutettavuus/ohjeita-ja-oppaita)

#### Automaattinen saavutettavuuden testaus

Kun osallistut projektin kehittämiseen, oleellinen osa on myös kattavien saavutettavuutta mittaavien automaatiotestien tekeminen. Tällä tavoin on helppo tarkistaa isoimmat saavutettavuuden tekniset ongelmat. Projektissa käytetään [axe-core](https://github.com/dequelabs/axe-core)-pohjaista saavutettavuustestaukseen tarkoitettua kirjastoa _(jest-axe, cypress-axe tms, pitää valita)_.

Testaamisen lähtökohta on, että saavutettavuus testataan aina, kun joku asia näkymässä muuttuu:

- Toiseen näkymään navigointi
- Viestit:
  - Uuden viestin lähettäminen
  - Uuden viestin vastaanottaminen
  - jne.

Ennen pull requestin tekoa tarkista aina, että toteuttamasi ominaisuudet eivät ole ristiriidassa saavutettavuuden periaatteiden kanssa!

Automaattisen saavutettavuustestauksen työkalut eivät kuitenkaan ole täydellisiä ja ne ovat vain teknisesti suuntaa antavia. Automaattitesti ei esimerkiksi ota kantaa siihen, onko informaation ja käyttöliittymän toiminta käyttäjälle ymmärrettävä.

#### Saavutettavuuden periaatteet ja lyhyt tarkistuslista

#### Muita työkaluja

Kun osallistut projektin kehittämiseen, oleellista on käyttää aiemmin mainittuja automaattisen saavutettavuustestauksen työkaluja. Olemassa on kuitenkin myös selainlaajennuksia WCAG-standardien mukaiseen testaamiseen. Niiden avulla on myös helppo tarkistaa tekniset saavutettavuuden ongelmat.

- Microsoftin selainlaajennus (selaintuki: Chrome, Edge Insider) löytyy [täältä](https://accessibilityinsights.io)
- axe-selainlaajennus (selaintuki: Chrome, Firefox, Android) löytyy [täältä](https://www.deque.com/axe/)

### Pull Request -käytännöt

Kaikki kehitystyö tulee tehdä issuekohtaisissa brancheissa. Kun kehitystyösi on valmis, tee omasta branchistasi pull request `development`-branchiin. `master`-branchi sisältää viimeisimmän julkaisuversion ohjelmistosta.

Pull requestit kohdistuvat yksittäiseen issueen. Viittaa issuen numeroon ja otsikkoon pull requestin otsikossa ja leipätekstissä, jolloin issue siirtyy projektin työlistalla automaattisesti suljetuksi, kun pull request on hyväksytty ja onnistuneesti mergetty. Pull requesteille on valmis pohja, täytä pohjassa määritellyt kohdat huolellisesti. Näin kuvailet yksityiskohtaisesti mitä toteutuksesi tekee ja miten. Tämä nopeuttaa pull requesteja läpikäyvien ja hyväksyvien ihmisten työtä.

Hankkeen tekninen kumppani vastaa pull requestien läpikäynnistä ja hyväksymisestä. Voit olettaa, että pull requestisi on käyty läpi viimeistään seuraavaan arkipäivään kello 17 mennessä.

### Bugien raportointi / uusien ominaisuustoiveiden tekeminen

Jos löydät projektista bugeja tee uusi issue [projektin issueihin](https://github.com/kohdataan/kohdataan-backend/issues/new/choose). Käytä bugien raportointiin tarkoitettua "Bug"-pohjaa.

Voit myös tehdä ehdotuksia uusiksi toteutettaviksi ominaisuuksiksi projektiin käyttäen samalta sivulta löytyvää "Feature"-pohjaa. Hankkeen henkilökunta arvioi ominaisuusehdotuksen tarpeellisuuden ja tarkoituksenmukaisuuden isommassa mittakaavassa, päättää otetaanko se projektin työlistalle, priorisoi sen sopivalle tasolle ja tarkentaa ominaisuuden kuvausta tarvittaessa.

## Kehitystyötä tukevaa materiaalia

[Mattermost API documentation](https://api.mattermost.com/)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/rovaniemi"><img src="https://avatars2.githubusercontent.com/u/21308995?v=4" width="100px;" alt=""/><br /><sub><b>Mauri Karlin</b></sub></a><br /><a href="#infra-rovaniemi" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/synyker"><img src="https://avatars2.githubusercontent.com/u/1566005?v=4" width="100px;" alt=""/><br /><sub><b>Jonne Airaksinen</b></sub></a><br /><a href="#infra-synyker" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#projectManagement-synyker" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/Pninja"><img src="https://avatars0.githubusercontent.com/u/23714794?v=4" width="100px;" alt=""/><br /><sub><b>Pinja Kuosmanen</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=Pninja" title="Code">💻</a> <a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=Pninja" title="Documentation">📖</a> <a href="https://github.com/kohdataan/kohdataan-frontend/pulls?q=is%3Apr+reviewed-by%3APninja" title="Reviewed Pull Requests">👀</a> <a href="#ideas-Pninja" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/eevajonnapanula"><img src="https://avatars0.githubusercontent.com/u/28345294?v=4" width="100px;" alt=""/><br /><sub><b>Eeva-Jonna</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=eevajonnapanula" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/emmalait"><img src="https://avatars1.githubusercontent.com/u/32375566?v=4" width="100px;" alt=""/><br /><sub><b>Emma Laitinen</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=emmalait" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/KaroliinaM"><img src="https://avatars1.githubusercontent.com/u/22050953?v=4" width="100px;" alt=""/><br /><sub><b>KaroliinaM</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=KaroliinaM" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/larenala"><img src="https://avatars2.githubusercontent.com/u/33627243?v=4" width="100px;" alt=""/><br /><sub><b>larenala</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=larenala" title="Code">💻</a> <a href="#ideas-larenala" title="Ideas, Planning, & Feedback">🤔</a> <a href="#a11y-larenala" title="Accessibility">️️️️♿️</a> <a href="https://github.com/kohdataan/kohdataan-frontend/pulls?q=is%3Apr+reviewed-by%3Alarenala" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mruis"><img src="https://avatars1.githubusercontent.com/u/5878384?v=4" width="100px;" alt=""/><br /><sub><b>Miika</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=mruis" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jheiska"><img src="https://avatars1.githubusercontent.com/u/22741213?v=4" width="100px;" alt=""/><br /><sub><b>jheiska</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=jheiska" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/PyryV"><img src="https://avatars0.githubusercontent.com/u/17298405?v=4" width="100px;" alt=""/><br /><sub><b>PyryV</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=PyryV" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/TerriFin"><img src="https://avatars0.githubusercontent.com/u/32302869?v=4" width="100px;" alt=""/><br /><sub><b>TerriFin</b></sub></a><br /><a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=TerriFin" title="Code">💻</a> <a href="https://github.com/kohdataan/kohdataan-frontend/commits?author=TerriFin" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tanjarasanen"><img src="https://avatars2.githubusercontent.com/u/49152094?v=4" width="100px;" alt=""/><br /><sub><b>tanjarasanen</b></sub></a><br /><a href="#ideas-tanjarasanen" title="Ideas, Planning, & Feedback">🤔</a> <a href="#a11y-tanjarasanen" title="Accessibility">️️️️♿️</a> <a href="#projectManagement-tanjarasanen" title="Project Management">📆</a> <a href="#userTesting-tanjarasanen" title="User Testing">📓</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
