import { CartActionTypes } from "./cart.types";
import { getItemsOrganized, decreaseItemQuantity } from "./cart.utils";
const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: getItemsOrganized(state.cartItems, action.payload)
      };

    case CartActionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      };

    case CartActionTypes.DESCREASE_QUANTITY:
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, action.payload)
      };

    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };

    default:
      return state;
  }
};

export default cartReducer;
