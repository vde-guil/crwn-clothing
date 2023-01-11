import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, emptyItemFromCart, removeItemFromCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';
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

	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()

	const addItem = () => {
		dispatch(addItemToCart(cartItem, cartItems));
	};

	const removeItem = () => {
		dispatch(removeItemFromCart(cartItem, cartItems));
	};

	const emptyItem = () => {
		dispatch(emptyItemFromCart(cartItem, cartItems));
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
