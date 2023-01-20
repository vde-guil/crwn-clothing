
// bundle 846kb
import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// REDUX ACTIONS
import { checkUserSession /*setCurrentUser*/ } from './store/user/user.actions';

import { useDispatch } from 'react-redux';

// synchronous imports
// import Home from './routes/home/home.component';
// import Authentication from './routes/authentication/authentication.component';
// import Navigation from './routes/navigation/navigation.component';
// import Shop from './routes/shop/shop.component';
// import Checkout from './routes/checkout/checkout.component';
import Spinner from './components/spinner/spinner.component';
import { GlobalStyle } from './global.styles';

// dynamic imports
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));


function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
		// const unsubscribe = onAuthStateChangedListener((user) => {
		// 	if (user) {
		// 		createUserDocumentFromAuth(user);
		// 	}
		// 	dispatch(setCurrentUser(user));
		// });

		// return unsubscribe;
	}, [dispatch]);

	return (
		<Suspense fallback={<Spinner/>}>
			<GlobalStyle />
			<div className='App'>
				<Routes>
					<Route path='/' element={<Navigation />}>
						<Route index element={<Home />} />
						<Route path='shop/*' element={<Shop />} />
						<Route path='auth' element={<Authentication />} />
						<Route path='checkout' element={<Checkout />} />
					</Route>
				</Routes>
			</div>
		</Suspense>
	);
}

export default App;
