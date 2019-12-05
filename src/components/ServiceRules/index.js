import React, { memo, useState } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import ModalContainer from '../ModalContainer'
import './styles.scss'

const ServiceRules = ({ setRulesAccepted }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const acceptRules = () => {
    setRulesAccepted(true)
    setModalIsOpen(false)
  }

  return (
    <div id="service-rules-container">
      <div className="service-rules-content">
        <ButtonContainer className="accept-rules-link" onClick={openModal}>
          {'Hyväksy palvelun säännöt'}
        </ButtonContainer>
        <ModalContainer
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          label="accept-rules-dialog"
        >
          <div className="service-rules-content">
            <h2>Palvelun säännöt</h2>
            <div className="service-rules-text">
              <p>
                Tässä kerrotaan palvelun säännöistä! Lorem ipsum dolor sit amet,
                nam no soleat putant albucius, ullum exerci honestatis nec no.
                Et assum platonem sed, animal ocurreret instructior vim at. Ad
                nec appareat assentior constituam, augue summo usu in, an mea
                ignota eloquentiam. Quo clita ullamcorper ne, melius habemus usu
                ne. Qui laoreet insolens tacimates ad, ea animal democritum mea.
                Has ut civibus appetere suavitate, ea ius maluisset
                voluptatibus, duo exerci fabellas corrumpit no. Pri te hendrerit
                argumentum, ne mentitum verterem mel.
              </p>
              <p>
                Esse iracundia et ius, natum singulis has at, enim facilis
                ancillae ad sit. Eu vis vulputate interesset, mei eripuit
                volutpat qualisque ea. Mutat ceteros invidunt eum at, vix ex
                ceteros constituto eloquentiam. Per duis velit recusabo ea. Vis
                dicam everti explicari an, pro eu tantas everti epicurei. Sea ea
                posse dicant, an noluisse accommodare mea. Eu mei possim
                utroque. Alii doming ei usu, cu nostro labitur vix. Eu nam
                inermis dignissim definitiones, eum forensibus sadipscing id.
                Nam in euripidis vituperata definitionem, erroribus persecuti ut
                est. Vis no nostrud repudiandae, sumo diceret constituam id quo,
                oblique iracundia id vis. Iudicabit argumentum theophrastus ne
                his, ea tota reformidans conclusionemque quo, est unum copiosae
                voluptaria ad. Vidit officiis an has.
              </p>
              <p>
                Vel ut facete aliquam deleniti, et equidem interesset sit. Ipsum
                dicam an vis, in nec nibh nemore. Vocent utamur duo ei, ius no
                diam aliquip sadipscing, ad odio diceret invidunt qui. Mel ut
                causae oblique, veri debet imperdiet usu ut. Commune insolens
                liberavisse eu est, at sea diam ancillae constituto. Quidam
                utamur minimum per ex, no per dicam moderatius, per cu clita
                delenit expetendis. Duo essent pertinax ei, rebum eleifend
                aliquando et sit.
              </p>
            </div>
            <ButtonContainer
              className="profile-modal-button accept-rules-modal-button"
              onClick={closeModal}
            >
              Palaa
            </ButtonContainer>
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
}

export default memo(ServiceRules)