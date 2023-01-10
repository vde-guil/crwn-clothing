import { useContext } from 'react';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CartContext } from '../../context/cart.context';

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total
} from './checkout.style.jsx';

function Checkout() {
	const { cartItems, total } = useContext(CartContext);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>remove</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((item) => {
				return <CheckoutItem key={item.id} cartItem={item} />;
			})}
			<Total>Total: ${total}</Total>
		</CheckoutContainer>
	);
}

export default Checkout;
