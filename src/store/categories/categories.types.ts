export enum CATEGORIES_ACTION_TYPES {
	FETCH_CATEGORIES_START = 'categories/FETCH_CATEGORIES_START',
	FETCH_CATEGORIES_SUCCESS = 'categories/FETCH_CATEGORIES_SUCCESS',
	FETCH_CATEGORIES_FAIL = 'categories/FETCH_CATEGORIES_FAIL',
};

export type CategoriesState = {
	readonly categories: Category[];
	readonly isLoading: boolean;
	readonly error: null | Error;
};

export type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
}

export type Category = {
	title: string;
	imageUrl: string;
	items: CategoryItem[]
}

export type CategoryMap = {
	[key: string]: CategoryItem[];
}