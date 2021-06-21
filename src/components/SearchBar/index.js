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
      <form className="search-bar" role="search">
        <label htmlFor="search" className="search-bar-description">
          Hae kaveria
          <div className="search-bar-input-content">
            <input
              id="search"
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
                label="Tyhjennä kenttä"
              >
                <i className="fas fa-times times-icon" aria-hidden="true" />
              </ButtonContainer>
            </div>
          </div>
        </label>
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
