import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import ButtonContainer from '../../ButtonContainer'

const PageInformation = props => {
  const { handleClick, path } = props
  let text = ''

  switch (path) {
    case '/me':
      text = `Tämä on oma profiilisi. Täällä näet omat profiilitietosi. Nämä tiedot näkyvät muille käyttäjille.
        \nTäältä pääset muokkaamaan tietojasi ja kiinnostuksesi kohteita. Jos haluat muokata tietojasi, valitse "Muokkaa". 
        \nJos haluat muokata kiinnostuksesi kohteita, valitse "Minua kiinnostaa".`
      break
    case '/edit-me':
      text = `Täällä voit muokata profiiliasi. \nVoit vaihtaa kuvan ja voit muuttaa nimesi.
        \nVoit valita näkyykö ikäsi ja kotikuntasi muille käyttäjille. Voit muokata itsestäsi kirjoittamaa kuvausta.  
        \nMuista tallentaa muutokset!`
      break
    case '/friends':
      text = `Täällä näet kaikki sinun kaverisi. Saat kavereita, kun lähetät ryhmän jäsenelle yksityisen viestin ja hän vastaa siihen.  
        \nVoit myös etsiä kavereita. Kirjoita kaverin nimi harmaaseen kenttään.
        \nTäällä näet, ovatko kaverisi lähettäneet sinulle uusia viestejä. Jos haluat lähettää kaverillesi viestin, valitse hänen nimensä. 
        \nJos et halua saada viestejä kaverilta, voit estää hänet. Valitse kaverin nimen vieressä olevat kolme pistettä, ja valitse estä.`
      break
    case '/edit-interests':
      text = `Täällä voit muokata kiinnostuksesi kohteita. Voit lisätä uuden tai poistaa vanhan kohteen. Voit valita 3-5 kohdetta.
        \nJos sinulla on jo viisi kiinnostuksen kohdetta ja haluat uuden, sinun pitää poistaa ainakin yksi kohde.
        \nMuista tallentaa muutokset!`
      break
    case '/':
      text = `Täällä näet kaikki ryhmät, joihin sinä kuulut. Täällä näet myös, kun me ehdotamme sinulle uutta ryhmää.
        \nJos haluat liittyä uuteen ryhmään, valitse Liity. Jos et halua liittyä ryhmään, valitse "Älä liity".
        \nVoit kuulua korkeintaan viiteen ryhmään.
        \nJos kuulut jo viiteen ryhmään ja haluat päästä uuteen ryhmään, sinun pitää ensin poistua jostain ryhmästä. Jos poistut ryhmästä, et voi liittyä siihen enää uudelleen.
        \nPääset ryhmään, kun valitset ryhmän kuvakkeen.`
      break
    case '/groupchat':
      text = `Tämän on ryhmän oma sivu. Täällä voit keskustella muiden ryhmän jäsenten
        kanssa. Voit lähettää ääniviestejä ja kuvia. Tämän keskustelun näkevät kaikki ryhmän jäsenet.
        
        \nKun valitset ryhmän nimen, näet ryhmän tiedot. Näet keitä ryhmään kuuluu ja milloin ryhmän jäsenet ovat olleet
        viimeksi paikalla. Näet myös, mitkä asiat teitä yhdistävät.
        
        \nJos haluat nähdä ryhmäläisen profiilin, valitse ryhmäläisen nimi. Ryhmäläisen profiilissa voit lähettää 
        hänelle yksityisviestin.
        
        \nTäällä voit myös poistua ryhmästä. Muista, että jos poistut ryhmästä, et voi enää palata siihen takaisin. 
        Mieti siis tarkasti, haluatko poistua ryhmästä. Jos haluat poistua ryhmästä, valitse "Poistu
        ryhmästä".`
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
  path: PropTypes.string.isRequired,
}

export default memo(PageInformation)
