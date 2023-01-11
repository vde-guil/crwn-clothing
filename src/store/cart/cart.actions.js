import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
	const itemFound = cartItems.find((item) => item.id === productToAdd.id);

	if (itemFound) {
		return cartItems.map((item) => {
			if (item.id === productToAdd.id) {
				item.quantity += 1;
			}
			return item;
		});
	} else {
		return [...cartItems, { ...productToAdd, quantity: 1 }];
	}
};

const removeCartItem = (cartItems, { id }) => {
	const itemFound = cartItems.find((item) => item.id === id);

	if (!itemFound) return;

	if (itemFound.quantity > 1) {
		itemFound.quantity--;
		return [...cartItems];
	}

	return cartItems.filter((item) => item.id !== id);
};

const emptyCartItem = (cartItems, { id }) => {
	return cartItems.filter((item) => item.id !== id);
};


export const addItemToCart = (productToAdd, cartItems) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return {type: CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload:newCartItems}

};

export const removeItemFromCart = (productToRemove, cartItems) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return {type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, payload:newCartItems}
};

export const emptyItemFromCart = (productToEmpty, cartItems) => {
  const newCartItems = emptyCartItem(cartItems, productToEmpty);
  return {type: CART_ACTION_TYPES.EMPTY_ITEM_FROM_CART, payload:newCartItems}

};

export const toggleIsCartOpen = (bool) => {
  const action = {
    type: CART_ACTION_TYPES.TOGGLE_CART_OPEN,
    payload: bool
  };
  return action;
};