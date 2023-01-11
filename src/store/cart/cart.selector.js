import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cartState) => cartState.cartItems,
);

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	(cartState) => cartState.isCartOpen,
);

export const selectTotal = createSelector([selectCartItems], (cartItems) => {
	return cartItems.reduce((total, item) => {
		return total + item.price * item.quantity;
	}, 0);
});

export const selectCartCount = createSelector([selectCartItems], (cartItems) => {
	return cartItems.reduce((acc, item) => {
    		return (acc += item.quantity);
    	}, 0);
});