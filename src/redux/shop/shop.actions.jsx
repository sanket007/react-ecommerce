import ShopTypes from "./shop.types";

export const updateCollection = collection => ({
  type: ShopTypes.UPDATE_COLLECTIONS,
  payload: collection
});
