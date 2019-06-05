/* eslint-disable linebreak-style */
import { createActions, createReducer } from 'reduxsauce';

/**
 *  Action types & creators
*/

export const { Types, Creators } = createActions({
  incrementQt: ['cd_produto'],
  decrementQt: ['cd_produto'],
  removeItem: ['cd_produto'],
});

/**
 * Handlers
 */

const INITAL_STATE = [];

const increment = (state, action) => {
  const currentQuantity = state[action.cd_produto] || 0;
  return {
    ...state,
    [action.cd_produto]: currentQuantity + 1,
  };
};

const decrement = (state, action) => {
  const currentQuantity = state[action.cd_produto] || 0;
  return {
    ...state,
    [action.cd_produto]: Math.max(currentQuantity - 1, 0),
  };
};

const remove = (state, action) => ({
  ...state,
  [action.cd_produto]: 0,
});

/**
 * Reducer
 */

export default createReducer(INITAL_STATE, {
  [Types.INCREMENT_QT]: increment,
  [Types.DECREMENT_QT]: decrement,
  [Types.REMOVE_ITEM]: remove,
});
