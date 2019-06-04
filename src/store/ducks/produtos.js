/* eslint-disable linebreak-style */
import { createActions, createReducer } from 'reduxsauce';

/**
 *  Action types & creators
 */

export const { Types, Creators } = createActions({
  addProduto: ['cd_produto', 'ds_produto', 'pr_produto'],
  removeProduto: ['cd_produto'],
});

/**
 *  Handlers
 */

const INITAL_STATE = [];
// https://www.youtube.com/watch?v=rPik5Z2SvHs assistir esse video
const add = (state = INITAL_STATE, action) => [
  ...state,
  { cd_produto: action.cd_produto, ds_produto: action.ds_produto, pr_produto: action.pr_produto },
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
