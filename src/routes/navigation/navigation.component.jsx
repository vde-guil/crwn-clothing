import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../context/cart.context';

import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
	NavigationContainer,
	LogoContainer,
	NavLinksContainer,
	NavLink,
} from './navigation.style.jsx';

function Navigation() {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

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
			{/* <div className='navigation'>
			</div> */}
			<Outlet />
		</Fragment>
	);
}

export default Navigation;
