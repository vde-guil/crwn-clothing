import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
	cartItems: [],
	isCartOpen: false,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.ADD_ITEM_TO_CART: {
			return {
				...state,
				cartItems: payload,
			};
		}
		case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART: {
			return {
				...state,
				cartItems: payload,
			};
		}
		case CART_ACTION_TYPES.EMPTY_ITEM_FROM_CART: {
			return {
				...state,
				cartItems: payload,
			};
		}
		case CART_ACTION_TYPES.TOGGLE_CART_OPEN: {
			return {
				...state,
				isCartOpen: payload,
			};
		}
		default: {
			return state;
		}
	}
};
