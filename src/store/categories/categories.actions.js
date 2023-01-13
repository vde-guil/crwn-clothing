import { CATEGORIES_ACTION_TYPES } from './categories.types';

export const fetchCategoriesStart = () => {
	return {
		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
	}
}

export const fetchCategoriesSuccess = (categories) => {
	return {
		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		payload: categories,
	}
}

export const fetchCategoriesFailed = (error) => {
	return {
		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL,
		payload: error,
	}
}
