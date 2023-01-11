import { createContext, useReducer } from 'react';

export const CartContext = createContext({
	cartItems: [],
	setCartItems: () => {},
	isCartOpen: false,
	toggleIsCartOpen: () => {},
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	emptyItemFromCart: () => {},
	cartCount: 0,
	total: 0,
});

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

const updateTotal = (cartItems) => {
	return cartItems.reduce((total, item) => {
		return total + item.price * item.quantity;
	}, 0);
};

const updateCartCount = (cartItems) => {
	return cartItems.reduce((acc, item) => {
		return (acc += item.quantity);
	}, 0);
};

export const CART_ACTION_TYPES = {
	ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
	REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
	EMPTY_ITEM_FROM_CART: 'EMPTY_ITEM_FROM_CART',
	TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.ADD_ITEM_TO_CART: {
			return {
				...state,
				...payload,
			};
		}
		case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART: {
			return {
				...state,
				...payload,
			};
		}
		case CART_ACTION_TYPES.EMPTY_ITEM_FROM_CART: {
			return {
				...state,
				...payload,
			};
		}
		case CART_ACTION_TYPES.TOGGLE_CART_OPEN: {
			return {
				...state,
				isCartOpen: !state.isCartOpen,
			};
		}
		default: {
			throw new Error(`Unhandled action type ${type} in cartReducer`);
		}
	}
};

const INITIAL_STATE = {
	cartItems: [],
	isCartOpen: false,
	total: 0,
	cartCount: 0,
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	const { cartItems, isCartOpen, total, cartCount } = state;


	const dispatchWithCountAndTotal = (actionType, newCartItems) => {
		const newCount = updateCartCount(newCartItems);
		const newTotal = updateTotal(newCartItems);
		const action = {
			type: actionType,
			payload: { cartItems: newCartItems, total: newTotal, cartCount: newCount },
		};
		dispatch(action);
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		dispatchWithCountAndTotal(CART_ACTION_TYPES.ADD_ITEM_TO_CART, newCartItems)

	};

	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		dispatchWithCountAndTotal(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, newCartItems)
	};

	const emptyItemFromCart = (productToEmpty) => {
		const newCartItems = emptyCartItem(cartItems, productToEmpty);
		dispatchWithCountAndTotal(CART_ACTION_TYPES.EMPTY_ITEM_FROM_CART, newCartItems)
	};

	const toggleIsCartOpen = () => {
		const action = {
			type: CART_ACTION_TYPES.TOGGLE_CART_OPEN,
		};
		dispatch(action);
	};

	const value = {
		cartItems,
		addItemToCart,
		isCartOpen,
		toggleIsCartOpen,
		removeItemFromCart,
		emptyItemFromCart,
		total,
		cartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
