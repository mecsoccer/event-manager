import React, { createContext, useReducer } from 'react';

type Color = 'success' | 'info' | 'warning' | 'error';
interface Action {
  type: string,
  payload: object,
}
interface ContextArg {
  state: {
    alert: { open: boolean, type: Color | undefined, duration: number, message: string, },
    pageLoader: typeof initialPageLoaderState,
  };
  dispatch?: React.Dispatch<Action>;
}

const initialAlertState = { open: false, type: "success" as Color, duration: 6000, message: '', };
const initialPageLoaderState = { open: false };

const initialState = {
  alert: initialAlertState,
  pageLoader: initialPageLoaderState,
};

const store = createContext<ContextArg>({ state: initialState });
const { Provider } = store;

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: typeof initialState, action: Action) => {
      switch(action.type) {
        case 'DISPLAY_ALERT':
          return { ...state, alert: { ...state.alert, ...action.payload } };
        case 'DISPLAY_PAGE_LOADER':
          return { ...state, pageLoader: { ...state.pageLoader, ...action.payload } };
        default:
          return state;
      }
    },
    initialState
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, StateProvider };
