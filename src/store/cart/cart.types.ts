import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
	ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART',
	REMOVE_ITEM_FROM_CART = 'cart/REMOVE_ITEM_FROM_CART',
	EMPTY_ITEM_FROM_CART = 'cart/EMPTY_ITEM_FROM_CART',
	TOGGLE_CART_OPEN = 'cart/TOGGLE_CART_OPEN',
}

export type CartItem = CategoryItem & {
	quantity: number;
};

export type CartState = {
	readonly cartItems: CartItem[];
	readonly isCartOpen: boolean;
};

