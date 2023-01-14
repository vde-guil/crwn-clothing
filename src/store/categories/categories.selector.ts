import { createSelector } from 'reselect';
import { RootState } from '../store';

import { CategoriesState } from './categories.types';
import { CategoryMap } from './categories.types';

const selectCategoryReducer = (state: RootState): CategoriesState =>
	state.categories;

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesState) => categoriesState.categories,
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories): CategoryMap => {
		const categoryMap = categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as CategoryMap);

		return categoryMap;
	},
);

export const selectIsLoading = createSelector(
	[selectCategoryReducer],
	(categoriesState) => categoriesState.isLoading,
);

export const selectError = createSelector(
	[selectCategoryReducer],
	(categoriesState) => categoriesState.error,
);
