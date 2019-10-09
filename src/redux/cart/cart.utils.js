export const getItemsOrganized = (cartItems, newCartItem) => {
  const newItemFound = cartItems.find(item => item.id === newCartItem.id);

  if (newItemFound) {
    return cartItems.map(item =>
      item.id === newCartItem.id
        ? { ...newCartItem, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...newCartItem, quantity: 1 }];
};
