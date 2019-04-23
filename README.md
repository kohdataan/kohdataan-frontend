[![CircleCI](https://circleci.com/gh/kohdataan/kohdataan-frontend.svg?style=svg)](https://circleci.com/gh/kohdataan/kohdataan-frontend)
[![Maintainability](https://api.codeclimate.com/v1/badges/9f187f6eae1c08f7f7be/maintainability)](https://codeclimate.com/github/kohdataan/kohdataan-frontend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9f187f6eae1c08f7f7be/test_coverage)](https://codeclimate.com/github/kohdataan/kohdataan-frontend/test_coverage)

# Somettamalla uutta kohtaamista -frontend

## Projektin tausta ja tavoitteet

Projektissa kehitämme ja toteutamme yhdessä uutta saavutettavaa somepalvelua, jossa on helppo tutustua uusiin ihmisiin. 

Tavoitteena on luoda palvelu, jossa on turvallinen ja myönteinen ilmapiiri, jossa ketään ei kiusata, ja jossa ketään ei jätetä yksin. Palvelussa tuetaan kohtaamista ja vuorovaikutusta, jotta kaikilla olisi mahdollisuus tutustua omanhenkisiin ihmisiin, ja myös ylläpitää kaverisuhteitaan.

Palvelu on avoin kaikille yli 15-vuotiaille nuorille ja aikuisille. Palvelun toteutuksessa otetaan huomioon käyttäjien erilaiset tarpeet saavutettavuuden ja helppokäyttöisyyden osalta, ja palvelussa voi myös viestiä erilaisin keinoin. Palvelu toteutetaan web-sovelluksena ensisijaisesti mobiililaitteille, mutta palvelua voi käyttää myös muilla laitteilla.

Palvelu ja sen tekninen yhteiskehittäminen liittyy Somettamalla uutta kohtaamista eli [Kohdataan-hankkeeseen](https://kohdataan.fi/), jossa tavoitteena on yksinäisyyden vähentäminen somen keinoin. 

Palvelun kehittäminen käynnistettiin keväällä 2018 Kohdataan-hackathonissa, jossa haastettiin eri alojen osaajia innovoimaan ja ideoimaan tulevaisuuden somepalvelua. Ideoista on työstetty yhdessä käyttäjien ja kumppaneiden kanssa konsepti, jonka kehittämistä ja toteuttamista on jatkettu keväällä 2019. Palvelu julkaistaan syksyllä 2019.

Palvelun toteutuksessa keskeistä on käyttäjälähtöisyys. Myös tekniseen toteutukseen on luotu yhteiskehittämisen malli, jossa palvelua kehitetään yhteistyössä paitsi käyttäjien, myös kaikkien palvelusta kiinnostuneiden ohjelmistokehittäjien ja muiden osaajien kanssa. Avoimuus ja yhdessä tekeminen, samoin uusien toimintatapojen kokeileminen on koko hankkeen ytimessä. Yhteiskehittämisestä saadaan myös tärkeää lisäresurssia palvelun toteutukseen.

Kohdataan-hanke on [Kehitysvammaliiton](https://www.kehitysvammaliitto.fi/) ja [Mielenterveysseuran](https://www.mielenterveysseura.fi/) yhteishanke. 

Hanketta rahoittaa Sosiaali- ja terveysjärjestöjen avustuskeskus [STEA](https://www.stea.fi/).

Teknisenä kumppanina ja yhteiskehittämisen koordinaattorina hankkeessa toimii [Perfektio](https://www.perfektio.fi/).

## Projektin asennus ja kehitysympäristön pystytys

### Frontend

Saat frontendin kehitysympäristön pystyyn ajamalla seuraavat komennot:

````bash
git clone git@github.com:kohdataan/kohdataan-frontend.git
cd kohdataan-frontend
npm install
npm start
````

### Tunnukset testaamiseen

## Dokumentaatio ja arkkitehtuuri

![Kohdataan arkkitehtuuri](https://github.com/kohdataan/kohdataan-backend/blob/master/documentation/kohdataan-architecture.png?raw=true "Kohdataan arkkitehtuuri")

## Ulkoasu

Projektin ulkoasu ja tyyliohjeet löytyvät osoitteesta https://app.zeplin.io/project/5cb591097f5deba21424eb89/

Tutustuaksesi designiin sinun täytyy rekisteröityä Zeplinin käyttäjäksi. Rekisteröitymisen jälkeen sinulla on pääsy ajantasaiseen näkymäkohtaiseen designiin. Projektin issueista linkataan suoraan yksittäisten näkymien designiin, jotta pääset helposti kiinni tekemiseen ulkoasunkin puolesta.

## Projektiin osallistuminen

### Backlog ja kehityksen kulku

Jos haluat osallistua projektin toteutukseen, valitse [projektin työlistalta](https://github.com/orgs/kohdataan/projects/1) kiinnostavan kuuloinen ominaisuus, assignaa se itsellesi ja siirrä se työlistalla "In progress"-sarakkeeseen. Projektin työlista koostuu hankkeen henkilökunnan ja teknisen toteutuskumppanin yhdessä suunnittelemista ominaisuuksista ja projektista löytyneistä bugeista. Kun aloitat ominaisuuden kehittämisen tai bugin korjauksen, tee kehitystyö omassa feature-branchissa, jonka nimeät muotoon `/<backend/frontend>/<issuen numero>/<lyhyt kuvaus issuen/issuen otsikko>`, esimerksi `/backend/2/LoginEndpoints`.

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

````
import { login } from 'mattermost-redux/actions/users'
````

Tämän jälkeen actionit voidaan yhdistää komponentin propseihin tuttuun tyyliin, käyttämällä connectia:

````
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
````

Kannattaa ehkä lisätä selaimeen esimerkiksi React Developer Tools, jonka avulla storen tilaa on helpompi pitää silmällä kehitysvaiheessa. Mattermost-reduxissa on actioneiden lisäksi valmiina kasapäin selectoreja, jotka kannattaa käydä läpi, ja joita kannattanee hyödyntää mahdollisuuksien mukaan ennen omien toteuttamista. Selectorit löytyvät mattermost-reduxin kansiosta [selectors](https://github.com/mattermost/mattermost-redux/tree/master/src/selectors) ja reducerit puolestaan kansiosta [reducers](https://github.com/mattermost/mattermost-redux/tree/master/src/reducers). Lisäksi storen hahmottamisessa auttaa [initial_state.js](https://github.com/mattermost/mattermost-redux/blob/master/src/store/initial_state.js).

Keskusteluun liittyvät toiminnallisuudet ovat kuitenkin vain yksi osa kohdataan-palvelua, joten aivan kaikkea ei löydy valmiina mattermost-reduxista. Esimerkiksi käyttäjäprofiiliin ja päivän kysymyksiin liittyvä toiminnallisuus on osittain tai kokonaan mattermostin ulkopuolella, joten näihin liittyvän tilan käsittelyyn on tarkoituksenmukaista luoda omat actionit tarvittaessa.

### Testaaminen

Projektin tavoittelema lopputulos on sosiaalisen median alusta, jolla voit tutustua uusiin ihmisiin turvallisesti ja saavutettavasti. Kattava testaus on luonnollisesti osa tämän tavoitteen saavuttamista.

Projekti noudattaa Web Content Accessibility Guidelines (WCAG) 2.1 -saavutettavuusstandardia. Kun osallistut projektin kehittämiseen, oleellinen osa on myös kattavien saavutettavuutta mittaavien automaatiotestien tekeminen. Projektissa käytetään [axe-core](https://github.com/dequelabs/axe-core)-pohjaista saavutettavuustestaukseen tarkoitettua kirjastoa *(jest-axe, cypress-axe tms, pitää valita)*.

Testaamisen lähtökohta on, että saavutettavuus testataan aina, kun joku asia näkymässä muuttuu: 

* Toiseen näkymään navigointi
* Viestit:
  * Uuden viestin lähettäminen
  * Uuden viestin vastaanottaminen
  * jne.
* 

Automaattisen saavutettavuustestauksen työkalut eivät kuitenkaan ole täydellisiä. Ennen pull requestin tekoa tarkistathan, että toteuttamasi ominaisuudet eivät ole ristiriidassa <insert sopiva saavutettavuuden checklist> kanssa.

### Pull Request -käytännöt

Kaikki kehitystyö tulee tehdä issuekohtaisissa brancheissa. Kun kehitystyösi on valmis, tee omasta branchistasi pull request `development`-branchiin. `master`-branchi sisältää viimeisimmän julkaisuversion ohjelmistosta.

Pull requestit kohdistuvat yksittäiseen issueen. Viittaa issuen numeroon ja otsikkoon pull requestin otsikossa ja leipätekstissä, jolloin issue siirtyy projektin työlistalla automaattisesti suljetuksi, kun pull request on hyväksytty ja onnistuneesti mergetty. Pull requesteille on valmis pohja, täytä pohjassa määritellyt kohdat huolellisesti. Näin kuvailet yksityiskohtaisesti mitä toteutuksesi tekee ja miten. Tämä nopeuttaa pull requesteja läpikäyvien ja hyväksyvien ihmisten työtä.

Hankkeen tekninen kumppani vastaa pull requestien läpikäynnistä ja hyväksymisestä. Voit olettaa, että pull requestisi on käyty läpi viimeistään seuraavaan arkipäivään kello 17 mennessä.

### Bugien raportointi / uusien ominaisuustoiveiden tekeminen

Jos löydät projektista bugeja tee uusi issue [projektin issueihin](https://github.com/kohdataan/kohdataan-backend/issues/new/choose). Käytä bugien raportointiin tarkoitettua "Bug"-pohjaa.

Voit myös tehdä ehdotuksia uusiksi toteutettaviksi ominaisuuksiksi projektiin käyttäen samalta sivulta löytyvää "Feature"-pohjaa. Hankkeen henkilökunta arvioi ominaisuusehdotuksen tarpeellisuuden ja tarkoituksenmukaisuuden isommassa mittakaavassa, päättää otetaanko se projektin työlistalle, priorisoi sen sopivalle tasolle ja tarkentaa ominaisuuden kuvausta tarvittaessa.

## Kehitystyötä tukevaa materiaalia
[Mattermost API documentation](https://api.mattermost.com/)

