import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actChangeIdEdit, deleteAndCreateArrayExpenses } from '../actions';
import '../style/table.css';

// como fazer uma tabela em HTML: https://flatschart.com/html5/tabelas.html

const TAGS_THEAD = ['Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class TableExpenses extends React.Component {
  findCurrencyName = (obj) => {
    const currencies = Object.values(obj.exchangeRates);
    const objName = currencies.filter((curr) => (
      curr.code === obj.currency && curr.codein === 'BRL'
    ));
    const name = objName[0].name.split('/')[0];
    return name;
  }

  findCambio = (obj) => {
    const currencies = Object.values(obj.exchangeRates);
    const objName = currencies.filter((curr) => (
      curr.code === obj.currency && curr.codein === 'BRL'
    ));
    const cambio = Number(objName[0].ask);
    return cambio.toFixed(2);
  }

  findValueConverted = (obj) => {
    const currencies = Object.values(obj.exchangeRates);
    const objName = currencies.filter((curr) => (
      curr.code === obj.currency && curr.codein === 'BRL'
    ));
    const result = Number(obj.value * objName[0].ask);
    return result.toFixed(2);
  }

  handleRemoveExpense = (id) => {
    const { dispatch, expenses } = this.props;
    dispatch(deleteAndCreateArrayExpenses(expenses, id));
  }

  handleEditExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(actChangeIdEdit(id));
  }

  render() {
    const { expenses } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            {TAGS_THEAD.map((curr) => <th key={ curr }>{curr}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((obj) => (
            <tr key={ obj.description }>
              <td>{obj.description}</td>
              <td>{obj.tag}</td>
              <td>{obj.method}</td>
              <td>{Number(obj.value).toFixed(2)}</td>
              <td>{this.findCurrencyName(obj)}</td>
              <td>{this.findCambio(obj)}</td>
              <td>{this.findValueConverted(obj)}</td>
              <td>Real</td>
              <td>
                <button
                  onClick={ () => this.handleEditExpense(obj.id) }
                  type="button"
                  data-testid="edit-btn"
                  className="btn btn-primary"
                >
                  Editar
                </button>
                <button
                  onClick={ () => this.handleRemoveExpense(obj.id) }
                  type="button"
                  data-testid="delete-btn"
                  className="btn btn-danger"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableExpenses);
