import React from 'react';
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
      <header data-testid="header-component">
        {loading
          ? <p>Carregando...</p>
          : <h1 data-testid="header-user-name">{ user }</h1>}
      </header>
    );
  }
}

export default Header;
