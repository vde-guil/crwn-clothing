import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import {
	Arrow,
	CheckoutItemContainer,
	ImageContainer,
	Name,
	Price,
	Quantity,
	RemoveButton,
	Value,
} from './checkout-item.style.jsx';

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
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<Name>{name}</Name>
			<Quantity>
				<Arrow onClick={removeItem}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItem}>&#10095;</Arrow>
			</Quantity>
			<Price>{price * quantity}</Price>
			<div className='remove'>
				<RemoveButton onClick={emptyItem}>&#10005;</RemoveButton>
			</div>
		</CheckoutItemContainer>
	);
}

export default CheckoutItem;
