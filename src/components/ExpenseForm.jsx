import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editAndCreateArrayExpenses, fetchCurrencies,
  fetchToNewExpense } from '../actions';
import '../style/expenseForm.css';

// após repetir 3 vezes a mesma string o lint pede para criar uma constante
const alimentacao = 'Alimentação';

class ExpenseForm extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate = (prevProps) => {
    const { idToEdit } = this.props;
    if (prevProps.idToEdit === null && typeof idToEdit === 'number') {
      this.clearState();
    }

    if (typeof prevProps.idToEdit === 'number' && idToEdit === null) {
      this.clearState();
    }
  }

  clearState = () => {
    const { idToEdit } = this.props;
    if (idToEdit === null) {
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: alimentacao,
      });
    } else {
      const beingEdited = this.findExpenseBeingEdited();
      this.setState({
        value: beingEdited.value,
        description: beingEdited.description,
        currency: beingEdited.currency,
        method: beingEdited.method,
        tag: beingEdited.tag,
      });
    }
  }

  findExpenseBeingEdited = () => {
    const { expenses, idToEdit } = this.props;
    const finding = expenses.find((curr) => curr.id === idToEdit);
    return finding;
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleSubmitClick = () => {
    const { currentExpenseId, dispatch, expenses, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newObj = {
      value,
      description,
      currency,
      method,
      tag,
    };
    if (idToEdit === null) {
      dispatch(fetchToNewExpense({ ...newObj, id: currentExpenseId }, expenses));
    } else {
      dispatch(editAndCreateArrayExpenses(expenses, idToEdit, newObj));
    }

    this.clearState();
  }

  render() {
    const {
      value, description, currency, method, tag,
    } = this.state;
    const { currencies, idToEdit } = this.props;

    return (
      <form className="expense-form">
        <input
          className="form-control value-input"
          name="value"
          onChange={ this.handleInputChange }
          value={ value }
          placeholder="Valor"
          type="number"
          data-testid="value-input"
        />
        <input
          className="form-control"
          value={ description }
          onChange={ this.handleInputChange }
          placeholder="Descrição"
          name="description"
          type="text"
          data-testid="description-input"
        />
        <label htmlFor="currencies">
          Moeda:
          <select
            className="form-select"
            onChange={ this.handleInputChange }
            id="currencies"
            value={ currency }
            name="currency"
          >
            {currencies.map((coin) => <option key={ coin }>{coin}</option>)}
          </select>
        </label>
        <select
          className="form-select"
          onChange={ this.handleInputChange }
          name="method"
          value={ method }
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          className="form-select"
          onChange={ this.handleInputChange }
          name="tag"
          value={ tag }
          data-testid="tag-input"
        >
          <option>{alimentacao}</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={ this.handleSubmitClick }
        >
          {idToEdit === null ? 'Adicionar despesa' : 'Editar Despesa' }
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentExpenseId: PropTypes.number.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currentExpenseId: state.wallet.expenses.length,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(ExpenseForm);
