import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputArtist: '',
      btnSearch: true,
      resultArtistSearch: '',
      loading: false,
      albumArtist: [],
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

  requestApiArtist = () => {
    const { inputArtist } = this.state;
    this.setState({
      resultArtistSearch: inputArtist,
      inputArtist: '',
      loading: true,
    }, async () => {
      const response = await searchAlbumsAPI(inputArtist);
      this.setState({
        loading: false,
        albumArtist: response,
      });
    });
  }

  render() {
    const { inputArtist, btnSearch,
      resultArtistSearch, albumArtist, loading } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <p>Carregando...</p> : (
          <div>
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
                onClick={ this.requestApiArtist }
              >
                Pesquisar
              </button>
            </form>
            {albumArtist.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
              <div>
                <p>
                  {`Resultado de álbuns de: ${resultArtistSearch}`}
                </p>
                {albumArtist.map((element) => (
                  <div key={ `${element.artistId}${element.collectionName}` }>
                    <img src={ element.artworkUrl100 } alt={ element.artistName } />
                    <p>{ element.artistName }</p>
                    <p>{ element.collectionName }</p>
                    <Link
                      data-testid={ `link-to-album-${element.collectionId}` }
                      to={ `/album/${element.collectionId}` }
                    >
                      Album de Música
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    );
  }
}

export default Search;
