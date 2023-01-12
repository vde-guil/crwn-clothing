import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { selectError, selectIsLoading } from '../../store/categories/categories.selector';
import Spinner from '../../components/spinner/spinner.component';

function Shop() {
	const dispatch = useDispatch();

	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	useEffect(() => {
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);

	if (error) {
		return <>{error.message}</>
	}
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
}

export default Shop;
