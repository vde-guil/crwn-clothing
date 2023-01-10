import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../context/categories.context';
import { CategoryContainer, CategoryTitle } from './category.style.jsx';

function Category() {
	const { category } = useParams();

	const { categoriesMap } = useContext(CategoriesContext);
	const products = useMemo(() => {
		return categoriesMap[category];
	}, [category, categoriesMap]);

	return (
		<>
			<CategoryTitle>
				{category.toUpperCase()}
			</CategoryTitle>
			<CategoryContainer>
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</CategoryContainer>
		</>
	);
}

export default Category;
