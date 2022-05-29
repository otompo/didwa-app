import { ACTIONS } from "./Actions";

const reducers = (stateData, action) => {
  switch (action.type) {
    case ACTIONS.ADD_CART:
      return {
        ...stateData,
        cart: action.payload,
      };
    case ACTIONS.ADD_ORDERS:
      return {
        ...stateData,
        orders: action.payload,
      };
    default:
      return stateData;
  }
};

export default reducers;
