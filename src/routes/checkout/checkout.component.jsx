import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import { selectCartItems, selectTotal } from '../../store/cart/cart.selector';

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total
} from './checkout.style.jsx';


function Checkout() {
	const cartItems = useSelector(selectCartItems)
	const total = useSelector(selectTotal)

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
			<PaymentForm/>
		</CheckoutContainer>
	);
}

export default Checkout;
