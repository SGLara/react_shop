import React, { useContext } from 'react';
import { AppContext } from '@context/AppContext';
import OrderItem from '@components/OrderItem';
import '@styles/MyOrder.scss';
import arrow from '@icons/flechita.svg';
import { v4 as uuidv4 } from 'uuid';

const MyOrder = ({ toggleOrders, setToggleOrders }) => {
    const { cartState } = useContext(AppContext);

    const sumTotal = () => {
        let total = 0;
        cartState.cart.forEach((item) => {
            total += item.price * item.qty;
        });
        return total;
    };

    return (
        <aside className="MyOrder">
            <div className="title-container">
                <span onClick={() => setToggleOrders(!toggleOrders)}>
                    <img src={arrow} alt="arrow" />
                </span>
                <p className="title">My order</p>
            </div>
            <div className="my-order-content">
                {
                    cartState.cart.map(product => (<OrderItem product={product} key={uuidv4()} />))
                }
                <div className="order">
                    <p>
                        <span>Total</span>
                    </p>
                    <p>$ {sumTotal()}</p>
                </div>
                <button className="primary-button">
                    Checkout
                </button>
            </div>
        </aside>
    );
}

export default MyOrder;
