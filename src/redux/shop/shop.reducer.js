import ShopTypes from "./shop.types";

const INITIAL_STATE = {
  collection: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collection: action.payload
      };

    default:
      return state;
  }
};

export default shopReducer;
