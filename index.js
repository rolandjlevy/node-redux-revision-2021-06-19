const redux = require('redux');
const {logger} = require('redux-logger');

const { createStore, applyMiddleware } = redux;

const INC_COUNTER = 'INC_COUNTER';
const DEC_COUNTER = 'DEC_COUNTER';

const incCounter = () => ({ type: INC_COUNTER });
const decCounter = () => ({ type: DEC_COUNTER });

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

const store = createStore(reducer, applyMiddleware(logger));

store.dispatch(incCounter());