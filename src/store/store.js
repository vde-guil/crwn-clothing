import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
// 	Boolean,
// );

const middleWares = [sagaMiddleware, process.env.NODE_ENV !== 'production' && logger].filter(
		Boolean,
	);

const composeEnhancer =
	(process.env.NODE_ENV !== 'production' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancer = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
