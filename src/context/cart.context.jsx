import { createContext, useState } from 'react';

export const CartContext = createContext({
	cartItems: [],
	setCartItems: () => {},
	isCartOpen: false,
	addItemToCart: () => {},
});

const addCartItem = (cartItems, productToAdd) => {
  const newCartItems = [...cartItems];
  const itemFound = newCartItems.find((item) => item.id === productToAdd.id)
  if (itemFound) {
    itemFound.quantity++;
  } else {
    newCartItems.push({...productToAdd, quantity: 1});
  }

  return newCartItems;
}

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

	const value = {
		cartItems,
		addItemToCart,
		isCartOpen,
		setIsCartOpen,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
