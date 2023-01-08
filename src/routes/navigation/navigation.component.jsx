import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.style.scss';



function Navigation() {
	const { currentUser } = useContext(UserContext);

	

	return (
		<Fragment>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<CrwnLogo />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					{currentUser === null ? (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					) : (
						<span className='nav-link' onClick={signOutUser}>
							SIGN OUT
						</span>
					)}
				</div>
			</div>
			<Outlet />
		</Fragment>
	);
}

export default Navigation;
