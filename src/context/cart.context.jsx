import { createContext, useState } from 'react';

export const CartContext = createContext({
	cartItems: [],
	setCartItems: () => {},
	isCartOpen: false,
	setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const value = {
		cartItems,
		setCartItems,
		isCartOpen,
		setIsCartOpen,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
