import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import ButtonContainer from '../../ButtonContainer'

const PageInformation = props => {
  const { handleClick, path, direct, inChat } = props
  let text = ''
  let page
  const regexForProfileLink = /\/profile\/[a-z0-9.-]+/i
  if (regexForProfileLink.test(path)) {
    page = '/member-profile'
  } else if (inChat && direct) {
    page = '/private-chat'
  } else if (inChat && !direct) {
    page = '/group-chat'
  } else {
    page = path
  }
  switch (page) {
    case '/me':
      text = `Tämä on oma profiilisi. 
        \nTäällä näet omat profiilitietosi. Nämä tiedot näkyvät myös muille käyttäjille.
        \nTäältä pääset muokkaamaan tietojasi ja kiinnostuksen kohteitasi. 
        \nJos haluat muokata tietojasi tai kiinnostuksen kohteitasi, valitse "Muokkaa".`
      break
    case '/edit-me':
      text = `Täällä voit muokata profiiliasi. 
        \nVoit vaihtaa oman kuvan. Kuva voi olla BMP-, JPG- tai PNG-tiedosto. Tiedoston koko voi olla enintään 50 MB. 
        \nVoit muuttaa nimesi ja asuinpaikkasi. Voit valita näkyykö ikäsi ja asuinpaikkasi muille käyttäjille. Voit myös muokata kuvausta, jossa kerrot itsestäsi.
        \nMuista tallentaa muutokset!`
      break
    case '/friends':
      text = `Täällä näet kaikki kaverisi. 
      \nTäällä näet, ovatko kaverisi lähettäneet sinulle uusia viestejä.
        \nKaikki käyttäjät, joiden kanssa olet viestitellyt kahdestaan, ovat kavereitasi.
        \nVoit lähettää toiselle käyttäjälle yksityisviestin hänen profiilistaan. Pääset toisen käyttäjän profiiliin ryhmän kautta, kun klikkaat ryhmässä hänen kuvakettaan.
        \nJos et halua enää viestitellä kaverin kanssa, voit estää hänet. Voit laittaa eston päälle ja myöhemmin poistaa sen, kun klikkaat kaverin nimen perässä olevia pisteitä.`
      break
    case '/edit-interests':
      text = `Täällä voit muokata kiinnostuksen kohteitasi.
        \nVoit lisätä uusia tai poistaa vanhoja kiinnostuksen kohteita klikkaamalla niitä. 
        \nVoit valita 3-5 kohdetta.
        \nMuista tallentaa muutokset!`
      break
    case '/':
      text = `Täällä näet kaikki ryhmäsi.
        \nTäällä näet uudet ryhmät, joita ehdotamme sinulle. Ehdotamme sinulle joka päivä uusia ryhmiä. Voit itse valita mihin ryhmiin liityt.
        \nTäällä näet myös kaikki omat ryhmät, joihin olet jo liittynyt. Näet, onko ryhmiin tullut uusia viestejä. Pääset keskustelemaan muiden ryhmäläisten kanssa, kun klikkaat ryhmän kuvaketta.
        \nVoit kuulua korkeintaan viiteen ryhmään. Jos kuulut jo viiteen ryhmään, ja haluat liittyä uuteen ryhmään, sinun täytyy ensin poistua jostain vanhasta ryhmästä.`
      break
    case '/group-chat':
      text = `Täällä voit keskustella muiden ryhmäläisten kanssa. 
        \nVoit kirjoittaa ja lähettää kuvia, videoita ja ääniviestejä.       
        \nKun klikkaat ryhmän nimeä, näet ryhmän tiedot. Näet ryhmän jäsenet, ja milloin he ovat olleet paikalla. Näet myös, mitkä asiat ryhmän jäseniä kiinnostaa.       
        \nKun klikkaat ryhmän jäsenen nimeä, näet hänen profiilinsa. Profiilissa voit lähettää hänelle yksityisen viestin.         
        \nTäällä voit myös poistua ryhmästä. Muista, että jos poistut ryhmästä, et voi palata siihen takaisin.
        \nJos huomaat keskustelussa asiattoman viestin tai viestejä, voit ilmoittaa siitä valvojalle. Valvoja voi poistaa viestin. Valvoja voi tarvittaessa myös liittyä keskusteluun. Valvojalla on pääsy kaikkiin ryhmäkeskusteluihin.`
      break
    case '/member-profile':
      text = `Tämä on toisen käyttäjän profiili.
        \nTäällä näet tiedot, jotka hän haluaa kertoa itsestään muille käyttäjille.
        \nJos haluat jutella käyttäjän kanssa kahdestaan, voit lähettää hänelle yksityisen viestin.
        \nKäyttäjät, joiden kanssa viestittelet kahdestaan, näkyvät Kavereissasi.`
      break
    case '/private-chat':
      text = `Täällä voit keskustella kaverisi kanssa kahdestaan.
        \nVoit kirjoittaa ja lähettää kuvia, videoita ja ääniviestejä.
        \nNäitä yksityisiä viestejä ei näe kukaan muu.`
      break
    case '/account':
      text = `Täällä näet omat rekisteröitymistietosi. Nämä tiedot eivät näy muille käyttäjille. 
        \nTäällä voit muokata tietojasi, jos esimerkiksi sukunimesi, sähköpostisi tai puhelinnumerosi vaihtuu.
        \nTäällä voit myös poistaa käyttäjätilisi kokonaan. Kun poistat käyttäjätilisi, poistamme sen palvelusta viikon päästä. Jos haluat jatkaa palvelun käyttöä, kirjaudu palveluun ennen kuin viikko on kulunut. Kun poistat käyttäjätilisi, viestisi jäävät palveluun nimettömänä.`
      break
    default:
  }

  return (
    <div className="page-information-container">
      <div className="page-info-text-content">{text}</div>
      <ButtonContainer
        className="button-close"
        tabIndex={0}
        onClick={handleClick}
      >
        Sulje
      </ButtonContainer>
    </div>
  )
}

PageInformation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  path: PropTypes.string,
  direct: PropTypes.bool,
  inChat: PropTypes.bool,
}

PageInformation.defaultProps = {
  direct: false,
  inChat: false,
  path: null,
}

export default memo(PageInformation)
