import s from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductAction, decrAction, incrAction } from '../../store/cartReducer';
import { useEffect } from 'react';

function Cart() {
  const cart = useSelector(store => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={s.wrap}>
      <h1>Корзина</h1>
      <div>
        {cart.map(elem => <div key={elem.id} className={s.cart_elem}>
          <h2>{elem.title}</h2>
          <div className={s.wrap_btns}>
            <button disabled={elem.count === 25} onClick={() => dispatch(incrAction(elem.id))}>+</button>
            <p>{elem.count}</p>
            <button onClick={() => dispatch(decrAction(elem.id))}>-</button>
          </div>
        </div>
        )}
      </div>
      <button onClick={() => dispatch(addNewProductAction(prompt()))}>Добавить новый продукт в корзину</button>
    </div>
  );
}

export default Cart;