import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

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

  musics = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    console.log(response);
    this.setState({
      listMusics: response,
      collectionName: response[0].collectionName,
      artistName: response[0].artistName,
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
              <div key={ `${element.trackId}` }>
                {element.previewUrl && (
                  <MusicCard
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                    artist={ element }
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
