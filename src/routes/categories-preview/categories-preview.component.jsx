import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import {
	selectCategoriesMap,
	selectError,
	selectIsLoading,
} from '../../store/categories/categories.selector';

// import './categories-preview.style.jsx';

function CategoriesPreview() {
	const categoriesMap = useSelector(selectCategoriesMap);

	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	if (error) {
		return <>{error.message}</>;
	}
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			{Object.keys(categoriesMap).map((title) => {
				const previewItems = categoriesMap[title];

				return (
					<CategoryPreview
						key={title}
						previewItems={previewItems.slice(0, 4)}
						title={title}
					/>
				);
			})}
		</>
	);
}

export default CategoriesPreview;
