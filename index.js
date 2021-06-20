const redux = require('redux');
const { createStore, applyMiddleware } = redux;
const { logger } = require('redux-logger');
const thunkMiddleware = require('redux-thunk').default;
const middlewares = [logger, thunkMiddleware];
const axios = require('axios');

// Action types
const INC_COUNTER = 'INC_COUNTER';
const DEC_COUNTER = 'DEC_COUNTER';

// Action creators
const incCounter = () => ({ type: INC_COUNTER });
const decCounter = () => ({ type: DEC_COUNTER });

const requestUsers = () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  return function(dispatch) {
    axios(url)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    });
  }
}

// Reducer
const initialState = { counter: 0 }

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case INC_COUNTER:
      return {
        ...state,
        counter: state.counter + 1
      }
    case DEC_COUNTER:
      return {
        ...state,
        counter: state.counter - 1
      }
    default:
      return state
  }
}

// Set up the store
const store = createStore(reducer, applyMiddleware(...middlewares));

store.dispatch(requestUsers());

store.dispatch(incCounter());