import { FormEventHandler, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import {StripeCardElement} from '@stripe/stripe-js'

import { useSelector } from 'react-redux';
import { selectTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import  { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.style';

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => {
	return card !== null;
}

function PaymentForm() {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

  const amount = useSelector(selectTotal);
  const currentUser = useSelector(selectCurrentUser);

	const paymentHandler:FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;

    setIsProcessingPayment(true);

		const { paymentIntent } = await fetch(
			'/.netlify/functions/create-payment-intent',
			{
				method: 'post',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ amount: amount * 100 }),
			},
		).then((res) => res.json());

		const clientSecret = paymentIntent.client_secret;

			const cardDetails = elements.getElement(CardElement);

			if (!ifValidCardElement(cardDetails))
				return;

		const paymentResults = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardDetails,
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		});

    setIsProcessingPayment(false);

    if (paymentResults.error) {
      alert(paymentResults.error)
    } else {
      if (paymentResults.paymentIntent.status === 'succeeded') {
        alert('payment successful')
      }
    }

	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment:</h2>
				<CardElement />
				<PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPES_CLASSES.inverted}> Pay Now</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
}

export default PaymentForm;
