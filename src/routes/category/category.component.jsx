import {  useMemo } from 'react';

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { selectCategoriesMap } from '../../store/categories/categories.selector';

import { CategoryContainer, CategoryTitle } from './category.style.jsx';

function Category() {
	const { category } = useParams();

	const  categoriesMap  = useSelector(selectCategoriesMap)
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
