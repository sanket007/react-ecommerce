import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  shop => shop.collection
);

export const selectShopPreviewItems = createSelector(
  [selectShopItems],
  collection => Object.keys(collection).map(key => collection[key])
);

export const selectCollection = urlParam =>
  createSelector(
    [selectShopItems],
    collections => collections[urlParam]
  );
