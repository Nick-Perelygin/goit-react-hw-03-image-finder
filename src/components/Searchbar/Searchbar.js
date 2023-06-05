import React from "react"
import Svg from './SearchSvg'
import PropTypes from 'prop-types';

class Searchbar extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  }

  handleOnChange = e => {
    this.setState({value: e.currentTarget.value})
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      value: '',
    })
  }

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmitForm}>
          <button type="submit" className="SearchForm-button">
            <Svg className="SearchForm-button-label"/>
          </button>
        
          <input
            className="SearchForm-input"
            type="text"
            style={{autocomplete: 'off', autofocus: 'true'}}
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleOnChange}
          />
        </form>
      </header>
    )
  }
}

export default Searchbar