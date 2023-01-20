import {
	createAction,
	ActionWithPayload,
	withMatcher,
} from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../categories/categories.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';




const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoryItem,
): CartItem[] => {
	if (!cartItems) return [];

	const itemFound = cartItems.find((item) => item.id === productToAdd.id);

	if (itemFound) {
		return cartItems.map((item) => {
			if (item.id === productToAdd.id) {
				item.quantity += 1;
				return { ...item };
			}
			return item;
		});
	} else {
		return [...cartItems, { ...productToAdd, quantity: 1 }];
	}
};

const removeCartItem = (
	cartItems: CartItem[],
	productToRemove: CategoryItem,
): CartItem[] => {
	if (!cartItems) return [];
	const itemFound = cartItems.find((item) => item.id === productToRemove.id);

	if (itemFound && itemFound.quantity > 1) {
		// itemFound.quantity--;
		return cartItems.map((cartItem) => {
			if (itemFound.id === cartItem.id) {
				return { ...cartItem, quantity: cartItem.quantity - 1 };
			}
			return cartItem;
		});
	}

	return cartItems.filter((item) => item.id !== productToRemove.id);
};

const emptyCartItem = (
	cartItems: CartItem[],
	productToEmpty: CategoryItem,
): CartItem[] => {
	if (!cartItems) return [];
	return cartItems.filter((item) => item.id !== productToEmpty.id);
};

type AddItemToCart = ActionWithPayload<
	CART_ACTION_TYPES.ADD_ITEM_TO_CART,
	CartItem[]
>;
type RemoveItemFromCart = ActionWithPayload<
	CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
	CartItem[]
>;
type EmptyItemFromCart = ActionWithPayload<
	CART_ACTION_TYPES.EMPTY_ITEM_FROM_CART,
	CartItem[]
>;
type ToggleIsCartOpen = ActionWithPayload<
	CART_ACTION_TYPES.TOGGLE_CART_OPEN,
	boolean
>;

export const addItemToCart = withMatcher(
	(productToAdd: CategoryItem, cartItems: CartItem[]): AddItemToCart => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		return createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, newCartItems);
	},
);

export const removeItemFromCart = withMatcher(
	(
		productToRemove: CategoryItem,
		cartItems: CartItem[],
	): RemoveItemFromCart => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		return createAction(
			CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
			newCartItems,
		);
	},
);

export const emptyItemFromCart = withMatcher(
	(productToEmpty: CategoryItem, cartItems: CartItem[]): EmptyItemFromCart => {
		const newCartItems = emptyCartItem(cartItems, productToEmpty);
		return createAction(CART_ACTION_TYPES.EMPTY_ITEM_FROM_CART, newCartItems);
	},
);

export const toggleIsCartOpen = withMatcher(
	(bool: boolean): ToggleIsCartOpen => {
		return createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool);
	},
);
