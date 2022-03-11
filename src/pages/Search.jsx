import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputArtist: '',
      btnSearch: true,
    };
  }

  btnSearchDisabled = () => {
    const { inputArtist } = this.state;
    const two = 2;
    if (inputArtist.length >= two) {
      this.setState({ btnSearch: false });
    } else {
      this.setState({ btnSearch: true });
    }
  }

  handleChangeArtist = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.btnSearchDisabled);
  }

  render() {
    const { inputArtist, btnSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="inputArtist"
            placeholder="Item a ser pesquisado"
            value={ inputArtist }
            onChange={ this.handleChangeArtist }
          />

          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ btnSearch }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
