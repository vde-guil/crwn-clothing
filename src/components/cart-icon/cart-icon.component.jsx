import { useContext, useMemo } from 'react';
import { CartContext } from '../../context/cart.context';

import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon,
} from './cart-icon.style.jsx';

function CartIcon() {
	const { setIsCartOpen, cartItems } = useContext(CartContext);

	const toggleIsCartOpen = () => {
		setIsCartOpen((prev) => !prev);
	};

	const count = useMemo(() => {
		return cartItems.reduce((acc, item) => {
			return (acc += item.quantity);
		}, 0);
	}, [cartItems]);

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{count}</ItemCount>
		</CartIconContainer>
	);
}

export default CartIcon;
