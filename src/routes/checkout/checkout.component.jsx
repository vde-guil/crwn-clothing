import { useContext } from 'react';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CartContext } from '../../context/cart.context';

import './checkout.style.scss';

function Checkout() {
	const { cartItems, total } = useContext(CartContext);

	
	return (
		<div className='checkout-container'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>
				<div className='header-block'>
					<span>Description</span>
				</div>
				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Price</span>
				</div>
				<div className='header-block'>
					<span>remove</span>
				</div>
			</div>
				{cartItems.map((item) => {
					return <CheckoutItem key={item.id} cartItem={item} />;
				})}
			<span className='total'>Total: ${total}</span>
		</div>
	);
}

export default Checkout;
