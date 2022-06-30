import { CURRENCIES_FIND,
  DELETE_EDIT_EXPENSE,
  NEW_EXPENSE,
  ATUALIZE_AMOUNT,
  CHANGE_ID_TO_EDIT } from '../actions';

const INITIAL_STATE = {
  expenseTotal: 0,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: null,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_FIND: return ({
    ...state,
    currencies: action.payload,
  });
  case NEW_EXPENSE: return ({
    ...state,
    expenses: [...state.expenses, action.payload],
  });
  case ATUALIZE_AMOUNT: return ({
    ...state,
    expenseTotal: action.payload,
  });
  case DELETE_EDIT_EXPENSE: return ({
    ...state,
    expenses: action.payload,
  });
  case CHANGE_ID_TO_EDIT: return ({
    ...state,
    idToEdit: action.payload,
  });
  default: return state;
  }
};

export default walletReducer;
