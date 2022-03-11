import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({
        loading: false,
        user: name,
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <>
        <header data-testid="header-component">
          {loading ? <p>Carregando...</p>
            : <h1 data-testid="header-user-name">{user}</h1>}
        </header>

        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </>
    );
  }
}

export default Header;
