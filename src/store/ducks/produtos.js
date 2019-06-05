/* eslint-disable linebreak-style */
import { createActions, createReducer } from 'reduxsauce';

/**
 *  Action types & creators
 */

export const { Types, Creators } = createActions({
  addProduto: ['cd_produto', 'ds_produto', 'pr_produto', 'quantidade'],
  removeProduto: ['cd_produto'],
  addQty: ['cd_produto', 'ds_produto', 'pr_produto', 'quantidade'],
});

/**
 *  Handlers
 */

const INITAL_STATE = [];
// https://www.youtube.com/watch?v=rPik5Z2SvHs assistir esse video
const add = (state = INITAL_STATE, action) => [
  ...state,
  {
    cd_produto: action.cd_produto,
    ds_produto: action.ds_produto,
    pr_produto: action.pr_produto,
    quantidade: 1,
  },
];

const remove = (state = INITAL_STATE, action) => state
  .filter(produto => produto.cd_produto !== action.cd_produto);

const qty = (state = INITAL_STATE, action) => [
  state.find(produto => produto.cd_produto !== action.cd_produto),
  {
    cd_produto: action.cd_produto,
    ds_produto: action.ds_produto,
    pr_produto: action.pr_produto,
    quantidade: action.quantidade + 1,
  },
];

/**
 * Reducer
 */

export default createReducer(INITAL_STATE, {
  [Types.ADD_PRODUTO]: add,
  [Types.REMOVE_PRODUTO]: remove,
  [Types.ADD_QTY]: qty,
});
