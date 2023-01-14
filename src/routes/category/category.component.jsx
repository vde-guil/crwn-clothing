import {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { CategoryContainer, CategoryTitle } from './category.style.jsx';

import {useQuery, gql} from '@apollo/client'

const GET_CATEGORY = gql`
query ($title: String!) {
	getCollectionsByTitle(title: $title) {
		id
		title
		items {
			id
			name
			price
			imageUrl
		}
	}
}
`

function Category() {
	const { category } = useParams();

	const {loading, data} = useQuery(GET_CATEGORY, {variables: {title: category}})
	const [products, setProducts] = useState([])
	// const { categoriesMap, loading } = useContext(CategoriesContext);
	// const products = useMemo(() => {
	// 	return categoriesMap[category];
	// }, [category, categoriesMap]);
	useEffect(() => {
		if (data) {
			setProducts(data.getCollectionsByTitle.items)
		}
	}, [data, category])
	

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
					<CategoryContainer>
						{products &&
							products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
					</CategoryContainer>
				</>
			)}
		</>
	);
}

export default Category;
