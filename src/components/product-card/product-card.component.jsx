import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import './product-card.style.scss';

function ProductCard({ product }) {
	const { name, imageUrl, price } = product;

  const {addItemToCart} = useContext(CartContext);

  const addProductToCard = () => {addItemToCart(product)}

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={name} />
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
			<Button onClick={addProductToCard} buttonType='inverted'>Add to cart</Button>
		</div>
	);
}

export default ProductCard;
