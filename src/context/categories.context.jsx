import { createContext, useState, useEffect } from 'react';
// import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

import { gql, useQuery } from '@apollo/client';

const COLLECTIONS = gql`
	query getCollections {
		collections {
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
`;

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const { loading, error, data } = useQuery(COLLECTIONS);
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(()=> {
		if (data) {
			const {collections} = data;
			const categoriesObject = collections.reduce((acc, {title, items}) => {
				acc[title.toLowerCase()] = items;
				return acc;
			}, {});
			setCategoriesMap(categoriesObject)
		}
	}, [data])


	const value = {
		categoriesMap,
		loading,
		error
	};

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
