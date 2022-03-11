import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputArtist: '',
    };
  }

  btnSearchDisabled = () => {
    const { inputArtist } = this.state;
    console.log(inputArtist);
  }

  render() {
    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <input data-testid="search-artist-input" type="text" />

          <button data-testid="search-artist-button" type="button">
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
