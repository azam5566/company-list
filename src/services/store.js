import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const SET_SNACKBAR_TEXT = 'SET_SNACKBAR_TEXT';
export const INSERT_DATA = 'INSERT_DATA';

const initialState = {
  snackbarText: '',
  snackbarType: 'warning',
  data: [],
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SNACKBAR_TEXT: {
      return {
        ...state,
        snackbarText: action.data.text,
        snackbarType: action.data.type,
      };
    }
    case INSERT_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  root: reducer,
});

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware())
);
