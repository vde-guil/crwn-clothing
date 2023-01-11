import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// COMPONENTS
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

// REDUX SELECTORS
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

// UTILS
import { signOutUser } from '../../utils/firebase/firebase.utils';

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
						<NavLink as='span'  onClick={signOutUser}>
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
