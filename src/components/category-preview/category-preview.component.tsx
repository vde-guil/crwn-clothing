import { CategoryItem } from '../../store/categories/categories.types';
import ProductCard from '../product-card/product-card.component';
import {
	CategoryPreviewContainer,
	Preview,
	TitleLink,
} from './category-preview.style';

type CategoryPreviewProps = {
	previewItems: CategoryItem[];
	title: string;
}

function CategoryPreview({ previewItems, title }: CategoryPreviewProps) {
	return (
		<CategoryPreviewContainer>
			<h2>
				<TitleLink to={title}>{title.toUpperCase()}</TitleLink>
			</h2>
			<Preview>
				{previewItems.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Preview>
		</CategoryPreviewContainer>
	);
}

export default CategoryPreview;
