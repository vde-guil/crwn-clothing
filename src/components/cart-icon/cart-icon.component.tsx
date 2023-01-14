import { useDispatch, useSelector } from 'react-redux';

import { toggleIsCartOpen } from '../../store/cart/cart.actions';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon,
} from './cart-icon.style';

function CartIcon() {
	const dispatch = useDispatch();

	const isCartOpen = useSelector(selectIsCartOpen);
	const cartCount = useSelector(selectCartCount);
	
	const toggleCartDropdown = () => {
		dispatch(toggleIsCartOpen(!isCartOpen));
	};

	return (
		<CartIconContainer onClick={toggleCartDropdown}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
}

export default CartIcon;
