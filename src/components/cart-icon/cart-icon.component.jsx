import './cart-icon.style.scss';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useContext, useMemo } from 'react';
import { CartContext } from '../../context/cart.context';

function CartIcon() {

  const {setIsCartOpen, cartItems} = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen(prev => !prev)
  }

  const count = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc += item.quantity
    }, 0)
  }, [cartItems]);
  

  return (
    <div onClick={toggleIsCartOpen} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className='item-count'>{count}</span>
    </div>
  )
}

export default CartIcon;