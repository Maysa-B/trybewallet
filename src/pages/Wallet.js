import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ExpenseForm />
        <TableExpenses />
      </>
    );
  }
}

export default Wallet;
