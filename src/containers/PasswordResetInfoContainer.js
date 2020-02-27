import React, { memo } from 'react'
import EmailSmsInfo from '../components/EmailSmsInfo'

const PasswordResetInfoContainer = () => {
  const passwordResetInfo = (
    <ol className="email-sms-info-list">
      <li>Avaa sähköposti.</li>
      <li>
        Olet saanut viestin, jossa on lähettäjänä &quot;Kohdataan&quot; ja
        aiheena &quot;Salasanan vaihtaminen&quot;.
      </li>
      <li>
        Kun klikkaat viestissä olevaa linkkiä, pääset sivulle, jossa voit
        vaihtaa salasanan.
      </li>
      <li>Anna sivulla uusi salasana ohjeiden mukaan.</li>
      <li>Kun klikkaat &quot;Vaihda&quot;, pääset kirjautumaan palveluun!</li>
    </ol>
  )
  return (
    <EmailSmsInfo
      title="Salasanan palautus"
      description="Lähetimme sinulle sähköpostilla linkin, josta pääset vaihtamaan salasanan."
      guide={passwordResetInfo}
    />
  )
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(PasswordResetInfoContainer, shouldComponentUpdate)
