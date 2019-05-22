import React, { PureComponent } from 'react'
import './styles.scss'

class Description extends PureComponent {
  render() {
    const { text } = this.props || ''
    return (
      <div className="description-container">
        <h2 className="description-header">Kuvaus</h2>
        <div className="description-text">{text}</div>
      </div>
    )
  }
}

export default Description
