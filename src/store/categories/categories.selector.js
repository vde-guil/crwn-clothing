import { createSelector } from "@reduxjs/toolkit";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesState) => categoriesState.categories,
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) => {
		const categoryMap = categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {});

		return categoryMap;
	},
);