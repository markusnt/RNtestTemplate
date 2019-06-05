import { combineReducers } from 'redux';

import produtos from './produtos';
import contadorpedido from './contadorpedido';

const reducers = combineReducers({
  produtos,
  contadorpedido,
});

export default reducers;
