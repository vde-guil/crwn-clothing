import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		const fetchCategories = async () => {
			const categories = await getCategoriesAndDocuments()

			setCategoriesMap(categories);
		};

		fetchCategories();
	}, [])

	const value = {
		categoriesMap,
	};

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
