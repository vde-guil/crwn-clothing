import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../context/categories.context';

import './categories-preview.style.scss';

function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);

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