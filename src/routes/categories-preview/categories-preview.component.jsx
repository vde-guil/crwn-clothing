import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../context/categories.context';
import Spinner from '../../components/spinner/spinner.component';
// import './categories-preview.style.jsx';

function CategoriesPreview() {
	const { categoriesMap, loading } = useContext(CategoriesContext);
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => {
					const previewItems = categoriesMap[title];

					return (
						<CategoryPreview
							key={title}
							previewItems={previewItems.slice(0, 4)}
							title={title}
						/>
					);
				})
			)}
		</>
	);
}

export default CategoriesPreview;
