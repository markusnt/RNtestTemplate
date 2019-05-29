/* eslint-disable linebreak-style */
import { createActions, createReducer } from 'reduxsauce';

/**
 *  Action types & creators
 */

export const { Types, Creators } = createActions({
  addProduto: ['cd_produto'],
  removeProduto: ['cd_produto'],
});

/**
 *  Handlers
 */

const INITAL_STATE = [];
// https://www.youtube.com/watch?v=rPik5Z2SvHs assistir esse video
const add = (state = INITAL_STATE, action) => [
  ...state,
  action.payload,
];

const remove = (state = INITAL_STATE, action) => state
  .filter(produto => produto.cd_produto !== action.cd_produto);

/**
 * Reducer
 */

export default createReducer(INITAL_STATE, {
  [Types.ADD_PRODUTO]: add,
  [Types.REMOVE_PRODUTO]: remove,
});
