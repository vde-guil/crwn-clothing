import { AnyAction } from 'redux';
import {
	addItemToCart,
	emptyItemFromCart,
	removeItemFromCart,
	toggleIsCartOpen,
} from './cart.actions';

import { CartState } from './cart.types';

const INITIAL_STATE: CartState = {
	cartItems: [],
	isCartOpen: false,
};

export const cartReducer = (
	state = INITIAL_STATE,
	action = {} as AnyAction,
): CartState => {
	if (
		addItemToCart.match(action) ||
		removeItemFromCart.match(action) ||
		emptyItemFromCart.match(action)
	) {
		return {
			...state,
			cartItems: action.payload,
		};
	}

	if (toggleIsCartOpen.match(action)) {
		return {
			...state,
			isCartOpen: action.payload,
		};
	}
	return state;
};
