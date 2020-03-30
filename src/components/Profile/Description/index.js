import React, { PureComponent } from 'react'
import './styles.scss'

class Description extends PureComponent {
  render() {
    const { text } = this.props || ''
    return (
      <section className="description-container">
        <h2 className="profile-secondary-header">Kuvaus</h2>
        <div className="description-text">{text}</div>
      </section>
    )
  }
}

export default Description
