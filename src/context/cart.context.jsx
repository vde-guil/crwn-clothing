import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext({
	cartItems: [],
	setCartItems: () => {},
	isCartOpen: false,
	setIsCartOpen: () => {},
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	emptyItemFromCart: () => {},
	total: 0
});

const addCartItem = (cartItems, productToAdd) => {
	const newCartItems = [...cartItems];
	const itemFound = newCartItems.find((item) => item.id === productToAdd.id);
	if (itemFound) {
		itemFound.quantity++;
	} else {
		newCartItems.push({ ...productToAdd, quantity: 1 });
	}

	return newCartItems;
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

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (productToAdd) => {
		setCartItems(removeCartItem(cartItems, productToAdd));
	};

	const emptyItemFromCart = (productToAdd) => {
		setCartItems(emptyCartItem(cartItems, productToAdd));
	};

	const total = useMemo(() => {
		console.log("computing total")
		return cartItems.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);
	}, [cartItems]);

	
	const value = {
		cartItems,
		addItemToCart,
		isCartOpen,
		setIsCartOpen,
		removeItemFromCart,
		emptyItemFromCart,
		total
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
