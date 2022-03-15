import propTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      inputChecked: false,
      favoritesMusics: [],
    };
  }

  componentDidMount() {
    this.getFavLocalStorage();
  }

  getFavLocalStorage = () => {
    this.setState({ loading: true });
    getFavoriteSongs().then((element) => {
      this.setState({
        favoritesMusics: element,
        loading: false,
      }, () => { this.isCheck(); });
    });
  }

  isCheck = () => {
    const { favoritesMusics } = this.state;
    const { artist: { trackId } } = this.props;
    favoritesMusics.forEach((index) => {
      if (index.trackId === trackId) {
        this.setState({ inputChecked: true });
      }
    });
  }

  favorites = () => {
    this.setState({ loading: true }, async () => {
      const { artist } = this.props;
      const { inputChecked } = this.state;
      await addSong(artist);
      this.setState({
        loading: false,
        inputChecked: !inputChecked,
      });
    });
  }

  render() {
    const { trackName, previewUrl, artist: { trackId } } = this.props;
    const { loading, inputChecked } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <form>
          {loading && <Loading />}
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              name="favorite"
              checked={ inputChecked }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.favorites }
            />
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;

export default MusicCard;
