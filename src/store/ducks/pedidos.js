/* eslint-disable linebreak-style */
export const Types = {
  ADD: 'pedidos/ADD',
  REMOVE: 'pedidos/REMOVE',
};

const INITAL_STATE = [];

export default function pedidos(state = INITAL_STATE, action) {
  switch (action.type) {
    case Types.ADD:
      return [
        ...state,
        action.payload,
      ];
    case Types.REMOVE:
      return state.filter(pedido => pedido.cd_produto === action.payload.cd_produto);
    default:
      return state;
  }
}
