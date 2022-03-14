import propTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      inputChecked: false,
    };
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
        <p>{trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <form>
          {loading && <p>Carregando...</p>}
          <label htmlFor="Favorita">
            Favorita
            <input
              type="checkbox"
              name="Favorita"
              id="Favorita"
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
