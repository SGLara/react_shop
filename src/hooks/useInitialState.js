import { useReducer } from "react";

const initialState = {
    cart: [],
}

const cartReducer = (state, action) => {
    const { payload } = action;
    let tempState;
    const productExists = state.cart.findIndex(prod => prod.id === payload.id);// -1 non existing, > -1 exists
    switch (action.type) {
        case 'ADD_TO_CART':
            if (productExists > -1) {
                tempState = {
                    ...state,
                    cart: [
                        ...state.cart.slice(0, productExists),
                        {
                            ...state.cart[productExists],
                            qty: state.cart[productExists].qty + 1
                        },
                        ...state.cart.slice(productExists + 1)
                    ]
                }
            } else {
                tempState = {
                    ...state,
                    cart: [...state.cart, { ...payload, qty: 1 }]
                };
            }

            return tempState;
        case 'REMOVE_FROM_CART':
            if (productExists > -1) {
                tempState = {
                    ...state,
                    cart: [
                        ...state.cart.slice(0, productExists),
                        {
                            ...state.cart[productExists],
                            qty: state.cart[productExists].qty - 1
                        },
                        ...state.cart.slice(productExists + 1)
                    ]
                };
            } if (state.cart[productExists].qty === 1) {
                tempState = {
                    ...state,
                    cart: state.cart.filter(item => item.id !== payload.id)
                };
            }

            return tempState;
        default:
            return state;
    }
}

const useInitialState = () => {
    // const [state, setState] = useState(initialState);
    const [cartState, dispatch] = useReducer(cartReducer, initialState);

    return {
        cartState,
        dispatch
    }
}

export default useInitialState; 