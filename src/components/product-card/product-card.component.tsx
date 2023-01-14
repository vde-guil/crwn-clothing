import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/categories/categories.types';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import {
	Footer,
	Name,
	Price,
	ProductCardContainer,
} from './product-card.style';

type ProductCardProps = {
	product: CategoryItem;
};

function ProductCard({ product }: ProductCardProps) {
	const { name, imageUrl, price } = product;
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const addProductToCard = () => {
		dispatch(addItemToCart(product, cartItems));
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
