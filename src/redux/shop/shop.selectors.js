import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  shop => shop.collection
);

export const selectIsLoading = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectShopPreviewItems = createSelector(
  [selectShopItems],
  collection =>
    collection ? Object.keys(collection).map(key => collection[key]) : []
);

export const selectCollection = urlParam =>
  createSelector(
    [selectShopItems],
    collections => (collections ? collections[urlParam] : null)
  );

export const selectIsCollectionsAreLoaded = createSelector(
  [selectShop],
  shop => !!shop.collection
);
