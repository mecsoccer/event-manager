import React, { createContext, useReducer } from 'react';

const initialAlertState = { open: false, type: 'success', duration: 6000, message: '', };
const initialPageLoaderState = { open: false };

const initialState = {
  alert: initialAlertState,
  pageLoader: initialPageLoaderState,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'DISPLAY_ALERT':
        return { ...state, alert: { ...state.alert, ...action.payload } };
      case 'DISPLAY_PAGE_LOADER':
        return { ...state, pageLoader: { ...state.pageLoader, ...action.payload } };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
}

export { store, StateProvider };
