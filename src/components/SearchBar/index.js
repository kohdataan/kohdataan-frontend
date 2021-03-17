import React from 'react'
import propTypes from 'prop-types'
import './styles.scss'
import ButtonContainer from '../ButtonContainer'

const SearchBar = React.forwardRef((props, ref) => {
  const { handleChange, handleClear, placeholder, label } = props
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="search-bar-container">
      <span className="search-bar-description">Hae kaveria</span>
      <form className="search-bar">
        <input
          className="search-bar-input"
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          ref={ref}
          aria-label={label}
        />
        <div className="search-bar-icon-clear">
          <ButtonContainer
            className="search-clear-button"
            onClick={handleClear}
            label="Tyhjennä"
          >
            <i className="fas fa-times times-icon" aria-hidden="true" />
          </ButtonContainer>
        </div>
      </form>
    </div>
  )
})

SearchBar.propTypes = {
  handleChange: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  handleClear: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
}

SearchBar.defaultProps = {}

export default SearchBar
