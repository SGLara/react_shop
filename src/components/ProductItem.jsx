import React, { useContext } from 'react';
import '@styles/ProductItem.scss';
import { AppContext } from '@context/AppContext';
import addToCartImage from '@icons/bt_add_to_cart.svg';
import addedToCartImage from '@icons/bt_added_to_cart.svg';

const ProductItem = ({ product }) => {
    const { cartState, dispatch } = useContext(AppContext);

    const isAddedToCart = cartState.cart.some(item => item.id === product.id);

    const addToCart = (item) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: item,
        });
    }

    return (
        <div className="ProductItem">
            <img src={product.images[0]} alt={product.title} />
            <div className="product-info">
                <div>
                    <p>$ {product.price}</p>
                    <p>{product.title}</p>
                </div>
                <figure onClick={() => addToCart(product)} >
                    {
                        isAddedToCart
                            ? <img src={addedToCartImage} alt="added_to_cart_svg" />
                            : <img src={addToCartImage} alt="add_to_cart_svg" />
                    }
                </figure>
            </div>
        </div>
    );
}

export default ProductItem;
