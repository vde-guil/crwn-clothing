import { AnyAction } from 'redux';
import { CategoriesState } from './categories.types';
import {
	fetchCategoriesFailed,
	fetchCategoriesStart,
	fetchCategoriesSuccess,
} from './categories.actions';

const INITIAL_STATE: CategoriesState = {
	categories: [],
	isLoading: false,
	error: null,
};

export const categoriesReducer = (
	state = INITIAL_STATE,
	action = {} as AnyAction,
): CategoriesState => {
	if (fetchCategoriesStart.match(action)) {
		return {
			...state,
			isLoading: true,
			error: null,
		};
	}

	if (fetchCategoriesSuccess.match(action)) {
		return {
			...state,
			categories: action.payload,
			isLoading: false,
		};
	}

	if (fetchCategoriesFailed.match(action)) {
		return {
			...state,
			error: action.payload,
			isLoading: false,
		};
	}

	return state;
};
