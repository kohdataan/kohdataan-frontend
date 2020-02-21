import React, { memo } from 'react'
import EmailSmsInfo from '../components/EmailSmsInfo'

const EmailVerificationInfoContainer = () => {
  const emailVerificationInfo = (
    <ol className="email-sms-info-list">
      <li>Avaa sähköposti.</li>
      <li>
        Olet saanut viestin, jossa on lähettäjänä &quot;Kohdataan&quot; ja
        aiheena &quot;Kirjautuminen&quot;.
      </li>
      <li>Kun klikkaat viestissä olevaa linkkiä, vahvistat sähköpostisi.</li>
      <li>Voit tämän jälkeen kirjautua palveluun.</li>
    </ol>
  )
  return (
    <EmailSmsInfo
      title="Sähköpostin vahvistus"
      description="Lähetimme sinulle sähköpostilla linkin, josta pääset vahvistamaan sähköpostisi."
      guide={emailVerificationInfo}
    />
  )
}

// TODO: refactor
const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(EmailVerificationInfoContainer, shouldComponentUpdate)
