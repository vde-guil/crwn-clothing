import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon,
} from './cart-icon.style.jsx';

function CartIcon() {
	const { toggleIsCartOpen, cartCount } = useContext(CartContext);

	const toggleCartDropdown = () => {
		toggleIsCartOpen();
	};

	return (
		<CartIconContainer onClick={toggleCartDropdown}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
}

export default CartIcon;
