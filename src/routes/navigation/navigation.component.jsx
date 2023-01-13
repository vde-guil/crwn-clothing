import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

// REDUX SELECTORS
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.actions';
import { selectCurrentUser } from '../../store/user/user.selector';

// STYLES
import {
	NavigationContainer,
	LogoContainer,
	NavLinksContainer,
	NavLink,
} from './navigation.style.jsx';

function Navigation() {
	const currentUser = useSelector(selectCurrentUser)
	const isCartOpen = useSelector(selectIsCartOpen);

	const dispatch = useDispatch();

	const signOutHandler = () => {
		dispatch((signOutStart()))
	}

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrwnLogo />
				</LogoContainer>
				<NavLinksContainer>
					<NavLink to='/shop'>
						SHOP
					</NavLink>
					{currentUser === null ? (
						<NavLink  to='/auth'>
							SIGN IN
						</NavLink>
					) : (
						<NavLink as='span'  onClick={signOutHandler}>
							SIGN OUT
						</NavLink>
					)}
					<CartIcon />
				</NavLinksContainer>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
}

export default Navigation;
