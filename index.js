const redux = require('redux');
const { logger } = require('redux-logger');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const { createStore, applyMiddleware } = redux;
const middlewares = [logger, thunkMiddleware];

// Action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
    loading: false
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
    loading: true
  }
}

const fetchUsersFailure = (msg) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: msg,
    loading: true
  }
}

const requestUsers = () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  return function(dispatch) {
    dispatch(fetchUsersRequest());
    axios(url)
    .then(response => {
      const users = response.data;
      dispatch(fetchUsersSuccess(users));
    })
    .catch(err => {
      dispatch(fetchUsersFailure(err.message));
    });
  }
}

// Reducer
const initialState = {
  loading: false,
  users: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: false
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: '',
        loading: true
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        users: [],
        loading: true
      }
    default:
      return state
  }
}

// Set up the store
const store = createStore(reducer, applyMiddleware(...middlewares));

store.dispatch(requestUsers());