import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import './category-preview.style.scss';

function CategoryPreview({ previewItems, title }) {


	return (
		<div className="category-preview-container">
			<h2>
      <Link to={title} className="title">{title.toUpperCase()}</Link>
      </h2>
			<div className='preview'>
				{previewItems.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default CategoryPreview;
