import React from 'react';
import propTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      btnFalse: true,
      loading: false,
    };
  }

  btnDisabled = () => {
    const { name } = this.state;
    const three = 3;
    if (name.length >= three) {
      this.setState({ btnFalse: false });
    } else {
      this.setState({ btnFalse: true });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    },
    () => this.btnDisabled());
  }

  Redirect() {
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name, btnFalse, loading } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          {loading && <Loading />}
          <input
            type="text"
            data-testid="login-name-input"
            id="login-name"
            name="name"
            placeholder="insira seu login"
            value={ name }
            onChange={ this.handleChange }
          />

          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ btnFalse }
            onClick={ async (event) => {
              event.preventDefault();
              this.setState({ loading: true }, async () => {
                await createUser({ name });
                this.setState({ loading: false });
                this.Redirect();
              });
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.props,
}.isRequired;

export default Login;
