import { LOGIN_MADE } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: 'teste@teste.com',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_MADE: return ({
    ...state,
    email: action.payload,
  });
  default: return state;
  }
};

export default userReducer;
