import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listMusics: [],
      collectionName: '',
      artistName: '',
    };
  }

  componentDidMount() {
    this.musics();
  }

  musics = () => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({}, async () => {
      const response = await getMusics(id);
      this.setState({
        listMusics: response,
        collectionName: response[0].collectionName,
        artistName: response[0].artistName,
      });
    });
  }

  render() {
    const { listMusics, artistName, collectionName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {listMusics.length > 0 && (
          <div>
            <p data-testid="artist-name">{ artistName }</p>
            <p data-testid="album-name">{ collectionName }</p>
            {listMusics.map((element) => (
              <div key={ `${element.trackNumber}${element.trackName}` }>
                {element.previewUrl && (
                  <MusicCard
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = ({
  match: propTypes.string,
}).isRequired;

export default Album;
