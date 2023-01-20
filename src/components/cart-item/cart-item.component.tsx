import {memo} from 'react'
import { CartItem as CartItemType} from '../../store/cart/cart.types';
import {
	CartItemContainer,
	ItemDetails,
	Name,
	Price,
} from './cart-item.style';

type CartItemProps = {
	cartItem: CartItemType
}

const memoCartItem = memo(function CartItem({ cartItem }: CartItemProps) {
	const { name, quantity, imageUrl, price } = cartItem;


	console.log('rerender item: '+ cartItem.id)

	return (
		<CartItemContainer>
			<img src={imageUrl} alt={name} />
			<ItemDetails>
				<Name>{name}</Name>
				<Price>
					{quantity} x ${price}
				</Price>
			</ItemDetails>
		</CartItemContainer>
	);
})

export default memoCartItem;
