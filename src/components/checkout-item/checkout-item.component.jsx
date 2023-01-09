import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.style.scss';

function CheckoutItem({ cartItem }) {
	const { name, imageUrl, price, quantity } = cartItem;

	const { addItemToCart, removeItemFromCart, emptyItemFromCart } =
		useContext(CartContext);

	const addItem = () => {
		addItemToCart(cartItem);
	};

	const removeItem = () => {
		removeItemFromCart(cartItem);
	};

	const emptyItem = () => {
		emptyItemFromCart(cartItem);
	};

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={name} />
			</div>
			<div className='name'>{name}</div>
			<div className='quantity'>
				<span className='arrow' onClick={removeItem}>
					&#10094;
				</span>
				<span className='value'>{quantity}</span>
				<span className='arrow' onClick={addItem}>
					&#10095;
				</span>
			</div>
			<div className='price'>{price * quantity}</div>
			<div className='remove'>
				<div className='remove-button' onClick={emptyItem}>
					&#10005;
				</div>
			</div>
		</div>
	);
}

export default CheckoutItem;
