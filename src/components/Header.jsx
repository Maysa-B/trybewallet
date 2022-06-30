import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../imgs/trybewallet.png';
import { totalAmount } from '../actions';
import userIcon from '../imgs/user-free-icon-font.png';
import '../style/header.css';

class Header extends React.Component {
  componentDidMount = () => {
    const { dispatch, expenses } = this.props;
    dispatch(totalAmount(expenses));
  }

  render() {
    const { email, totalValue } = this.props;

    return (
      <header>
        <img className="logo-img" src={ logo } alt="logo-trybe-wallet" />
        <section className="header-right">
          <div>
            <img className="user-icon" src={ userIcon } alt="userIcon" />
            <p data-testid="email-field">{ email }</p>
          </div>
          <p data-testid="total-field">
            R$
            { totalValue }
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.expenseTotal,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
