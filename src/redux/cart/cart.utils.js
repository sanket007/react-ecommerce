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

export const decreaseItemQuantity = (cartItems, removeItemQuantity) => {
  if (removeItemQuantity.quantity > 1) {
    return cartItems.map(item =>
      item.id === removeItemQuantity.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
  return cartItems.filter(item => item.id !== removeItemQuantity.id);
};
