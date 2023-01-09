import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import './cart-dropdown.style.scss';
import { useNavigate } from 'react-router-dom';

function CartDropdown() {
	const { cartItems, setIsCartOpen } = useContext(CartContext);

  const navigate = useNavigate();

	const goToCheckout = () => {
		setIsCartOpen(false);
		navigate('/checkout')
	}

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => {
					return <CartItem key={item.id} cartItem={item} />;
				})}
			</div>
			<Button onClick={goToCheckout}>Go to checkout</Button>
		</div>
	);
}

export default CartDropdown;
