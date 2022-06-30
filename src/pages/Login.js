import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actLogin } from '../actions';
import logo from '../imgs/trybewallet.png';
import '../style/login.css';

// fiz algumas alterações, mas a fonte do regex de verificação de email:
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  }

  verifyInputsValue = () => {
    const { email, password } = this.state;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const MIN_LENGTH = 6;

    if (regexEmail.test(email) === true && password.length >= MIN_LENGTH) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.verifyInputsValue());
  }

  handleSubmit = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(actLogin(email));
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <form className="login-page">
        <img className="logo-img" src={ logo } alt="logo-trybe-wallet" />
        <section className="login-area">
          <label htmlFor="email">
            <h4 className="email-heading">Email</h4>
            <input
              id="email"
              className="form-control"
              onChange={ this.handleInputChange }
              value={ email }
              name="email"
              type="email"
              data-testid="email-input"
            />
          </label>

          <label htmlFor="senha">
            <h4>Password</h4>
            <input
              id="senha"
              className="form-control"
              onChange={ this.handleInputChange }
              value={ password }
              name="password"
              type="password"
              data-testid="password-input"
            />
          </label>
        </section>
        <button
          className="btn btn-secondary"
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
