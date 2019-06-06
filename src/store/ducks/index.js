import { combineReducers } from 'redux';

import produtos from './produtos';
import contadorpedido from './contadorpedido';
import { carrinhoReducer } from './carrinhoprodutos';

// const reducers = combineReducers({
//   carrinhoprodutos,
// });

export default combineReducers({
  carrinhoReducer,
});
