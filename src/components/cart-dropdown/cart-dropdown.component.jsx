import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import { useNavigate } from 'react-router-dom';

import {
	CartDropDownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.style.jsx';

function CartDropdown() {
	const { cartItems, setIsCartOpen } = useContext(CartContext);

	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		setIsCartOpen(false);
		navigate('/checkout');
	};

	return (
		<CartDropDownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => {
						return <CartItem key={item.id} cartItem={item} />;
					})
				) : (
					<EmptyMessage> Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button
				buttonType={BUTTON_TYPES_CLASSES.base}
				onClick={goToCheckoutHandler}
			>
				Go to checkout
			</Button>
		</CartDropDownContainer>
	);
}

export default CartDropdown;
