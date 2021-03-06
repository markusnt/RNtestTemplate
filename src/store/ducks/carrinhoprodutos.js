/* eslint-disable linebreak-style */
/* eslint-disable no-else-return */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/**
 * Types
 */

const DATA_API = 'DATA_API';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';
const SUB_QUANTITY = 'SUB_QUANTITY';
const ADD_QUANTITY = 'ADD_QUANTITY';

/**
 * Actions
 */

export const dataApi = date => ({
  type: DATA_API,
  payload: date,
});

export const addToCart = cd_produto => ({
  type: ADD_TO_CART,
  cd_produto,
});

export const removeItem = cd_produto => ({
  type: REMOVE_ITEM,
  cd_produto,
});

export const subtractQuantity = cd_produto => ({
  type: SUB_QUANTITY,
  cd_produto,
});

export const addQuantity = cd_produto => ({
  type: ADD_QUANTITY,
  cd_produto,
});

/**
 * Reducer
 */
const INITAL_STATE = {
  items: [],
  addedItems: [],
  total: 0,
};

export const carrinhoReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case DATA_API:
      // console.log('chamou porra');
      return {
        ...state,
        items: action.payload,
      };

    case ADD_TO_CART:
      let addedItem = state.items.find(item => item.cd_produto === action.cd_produto);
      let existed_item = state.addedItems.find(item => action.cd_produto === item.cd_produto);
      // console.log('===');
      // console.log(state)
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: state.total + addedItem.pr_produto,
        };
      } else {
        addedItem.quantity = 1;
        let newTotal = state.total + addedItem.pr_produto;
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
        };
      }

    case REMOVE_ITEM:
      let itemToRemove = state.addedItems.find(item => action.cd_produto === item.cd_produto);
      let new_items = state.addedItems.filter(item => action.cd_produto !== item.cd_produto);
      let newTotalREMOVE = state.total - (itemToRemove.pr_produto * itemToRemove.quantity);
      console.log(itemToRemove);
      return {
        ...state,
        addedItems: new_items,
        total: newTotalREMOVE,
      };

    case ADD_QUANTITY:
      let addedItemADD = state.items.find(item => item.cd_produto === action.cd_produto);
      addedItemADD.quantity += 1;
      let newTotalADD = state.total + addedItemADD.pr_produto;
      return {
        ...state,
        total: newTotalADD,
      };

    case SUB_QUANTITY:
      let addedItemSUB = state.items.find(item => item.cd_produto === action.cd_produto);
      if (addedItemSUB.quantity === 1) {
        let new_itemsSUB = state.addedItems.filter(item => item.cd_produto !== action.cd_produto);
        let newTotalSUB = state.total - addedItemSUB.pr_produto;
        return {
          ...state,
          addedItems: new_itemsSUB,
          total: newTotalSUB,
        };
      } else {
        addedItemSUB.quantity -= 1;
        let newTotalSUB = state.total - addedItemSUB.pr_produto;
        return {
          ...state,
          total: newTotalSUB,
        };
      }

    default:
      return state;
  }
};

// export const carrinhoReducer = (state = INITAL_STATE, action) => {
//   if (action.type === DATA_API) {
//     return {
//       ...state,
//     };
//   }
//   if (action.type === ADD_TO_CART) {
//     let addedItem = state.items.find(item => item.cd_produto === action.cd_produto);
//     let existed_item = state.addedItems.find(item => action.cd_produto === item.cd_produto);
//     if (existed_item) {
//       addedItem.quantity += 1;
//       return {
//         ...state,
//         total: state.total + addedItem.pr_produto,
//       };
//     } else {
//       addedItem.quantity = 1;
//       let newTotal = state.total + addedItem.pr_produto;

//       return {
//         ...state,
//         addedItems: [...state.addedItems, addedItem],
//         total: newTotal,
//       };
//     }
//   }

//   if (action.type === REMOVE_ITEM) {
//     let itemToRemove = state.addedItems.find(item => action.cd_produto === item.cd_produto);
//     let new_items = state.addedItems.filter(item => action.cd_produto !== item.cd_produto);

//     let newTotal = state.total - (itemToRemove.pr_produto * itemToRemove.quantity);
//     console.log(itemToRemove);
//     return {
//       ...state,
//       addedItems: new_items,
//       total: newTotal,
//     };
//   }

//   if (action.type === ADD_QUANTITY) {
//     let addedItem = state.items.find(item => item.cd_produto === action.cd_produto);
//     addedItem.quantity += 1;
//     let newTotal = state.total + addedItem.pr_produto;
//     return {
//       ...state,
//       total: newTotal,
//     };
//   }

//   if (action.type === SUB_QUANTITY) {
//     let addedItem = state.items.find(item => item.cd_produto === action.cd_produto);

//     if (addedItem.quantity === 1) {
//       let new_items = state.addedItems.filter(item => item.cd_produto !== action.cd_produto);
//       let newTotal = state.total - addedItem.pr_produto;
//       return {
//         ...state,
//         addedItems: new_items,
//         total: newTotal,
//       };
//     } else {
//       addedItem.quantity -= 1;
//       let newTotal = state.total - addedItem.pr_produto;
//       return {
//         ...state,
//         total: newTotal,
//       };
//     }
//   }
//   return state;
// }