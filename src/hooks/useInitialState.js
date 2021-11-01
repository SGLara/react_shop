import { useState } from "react";

const initialState = {
    cart: [],
}

const useInitialState = () => {
    const [state, setState] = useState(initialState);

    const addToCart = (payload) => {
        const productExists = state.cart.findIndex(prod => prod.id === payload.id);// -1 non existing, > -1 exists

        // * Way 1 to solve it
        if (productExists > -1) {
            setState({
                ...state,
                cart: [
                    ...state.cart.slice(0, productExists),
                    {
                        ...state.cart[productExists],
                        qty: state.cart[productExists].qty + 1
                    },
                    ...state.cart.slice(productExists + 1)
                ]
            });
        } else {
            setState({
                ...state,
                cart: [...state.cart, { ...payload, qty: 1 }]
            });
        }

        // * Way 2 to solve it (with setStateValidated)
        // setState({
        //     ...state,
        //     cart: setStateValidated(productExists)
        // });
    };

    const removeFromCart = (payload) => {
        const productExists = state.cart.findIndex(prod => prod.id === payload.id);// -1 non existing, > -1 exists

        if (productExists > -1) {
            setState({
                ...state,
                cart: [
                    ...state.cart.slice(0, productExists),
                    {
                        ...state.cart[productExists],
                        qty: state.cart[productExists].qty - 1
                    },
                    ...state.cart.slice(productExists + 1)
                ]
            });
        } if (state.cart[productExists].qty === 1) {
            setState({
                ...state,
                cart: state.cart.filter(item => item.id !== payload.id)
            });
        }
    };
    
    console.log(state);


    const setStateValidated = (productIndex) => {
        if (productIndex > -1) {
            return [
                ...state.cart.slice(0, productIndex),
                {
                    ...state.cart[productIndex],
                    qty: state.cart[productIndex].qty + 1
                },
                ...state.cart.slice(productIndex + 1)
            ];
        } else {
            return [...state.cart, { ...payload, qty: 1 }];
        }
    }


    return {
        state,
        addToCart,
        removeFromCart
    }
}

export default useInitialState; 