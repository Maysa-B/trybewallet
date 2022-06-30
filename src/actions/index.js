export const LOGIN_MADE = 'LOGIN_MADE';
export const CURRENCIES_FIND = 'CURRENCIES_FIND';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const ATUALIZE_AMOUNT = 'ATUALIZE_AMOUNT';
export const CHANGE_ID_TO_EDIT = 'CHANGE_ID_TO_EDIT';
export const DELETE_EDIT_EXPENSE = 'DELETE_EDIT_EXPENSE';

export const actLogin = (email) => ({
  type: LOGIN_MADE,
  payload: email,
});

export const actChangeIdEdit = (value) => ({
  type: CHANGE_ID_TO_EDIT,
  payload: value,
});

const actCurrencies = (currencies) => ({
  type: CURRENCIES_FIND,
  payload: currencies,
});

const actNewExpense = (objExpense) => ({
  type: NEW_EXPENSE,
  payload: objExpense,
});

const atualizeAmount = (value) => ({
  type: ATUALIZE_AMOUNT,
  payload: value,
});

const deleteOrEditFromExpenses = (array) => ({
  type: DELETE_EDIT_EXPENSE,
  payload: array,
});

export const totalAmount = (array) => (dispatch) => {
  let total = 0;
  array.forEach((curr) => {
    const currencies = Object.values(curr.exchangeRates);
    const currencyValue = currencies.filter((obj) => (
      obj.code === curr.currency && obj.codein === 'BRL'
    ));
    total += (currencyValue[0].ask * curr.value);
  });

  dispatch(atualizeAmount(total.toFixed(2)));
};

export const editAndCreateArrayExpenses = (array, id, newObj) => (dispatch) => {
  const newArray = [];
  array.forEach((obj) => {
    if (obj.id !== id) {
      newArray.push(obj);
    } else {
      newArray.push({
        ...newObj,
        id: obj.id,
        exchangeRates: obj.exchangeRates,
      });
    }
  });
  dispatch(deleteOrEditFromExpenses(newArray));
  dispatch(totalAmount(newArray));
  dispatch(actChangeIdEdit(null));
};

// para quando remover uma expense
export const deleteAndCreateArrayExpenses = (array, id) => (dispatch) => {
  const newArray = array.filter((curr) => curr.id !== id);
  dispatch(deleteOrEditFromExpenses(newArray));
  dispatch(totalAmount(newArray));
};

export const fetchToNewExpense = (objExpense, array) => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const fetchResult = await fetch(URL);
  const jsonResult = await fetchResult.json();
  const newObj = {
    ...objExpense,
    exchangeRates: jsonResult,
  };
  dispatch(actNewExpense(newObj));
  dispatch(totalAmount([...array, newObj]));
};

// sempre lembrar: uma função que RETORNA UMA FUNÇÃO
export const fetchCurrencies = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const fetchResult = await fetch(URL);
  const jsonResult = await fetchResult.json();
  const array = Object.keys(jsonResult);
  const currencies = array.filter((moeda) => moeda !== 'USDT');
  // não basta invocar a função, tem que ter o DISPATCH
  dispatch(actCurrencies(currencies));
};
