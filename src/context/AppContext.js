import React from 'react';
import useInitialState from '@hooks/useInitialState';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const { cartState, dispatch } = useInitialState();

    return (
        <AppContext.Provider value={{
            cartState,
            dispatch
        }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };