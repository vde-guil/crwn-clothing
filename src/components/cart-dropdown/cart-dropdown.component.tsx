import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';


import { toggleIsCartOpen } from '../../store/cart/cart.actions';

import { useNavigate } from 'react-router-dom';

import {
	CartDropDownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.style';

import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

function CartDropdown() {

	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		dispatch(toggleIsCartOpen(false));
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
					<EmptyMessage> Your cart is empty </EmptyMessage>
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
