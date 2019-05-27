import { combineReducers } from 'redux';

import pedidos from './pedidos';

const reducers = combineReducers({
  pedidos,
});

export default reducers;
