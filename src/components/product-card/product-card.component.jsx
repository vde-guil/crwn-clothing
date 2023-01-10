import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import {
	Footer,
	Name,
	Price,
	ProductCardContainer,
} from './product-card.style.jsx';

function ProductCard({ product }) {
	const { name, imageUrl, price } = product;

	const { addItemToCart } = useContext(CartContext);

	const addProductToCard = () => {
		addItemToCart(product);
	};

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={name} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button
				onClick={addProductToCard}
				buttonType={BUTTON_TYPES_CLASSES.inverted}
			>
				Add to cart
			</Button>
		</ProductCardContainer>
	);
}

export default ProductCard;
