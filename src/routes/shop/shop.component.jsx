import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { setCategories } from '../../store/categories/categories.actions';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

function Shop() {
	const dispatch = useDispatch();


	useEffect(() => {
		const fetchCategories = async () => {
			const categoriesArray = await getCategoriesAndDocuments();

			dispatch(setCategories(categoriesArray));
		};

		fetchCategories();
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
}

export default Shop;
