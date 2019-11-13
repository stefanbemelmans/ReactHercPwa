// Per the redux docs, moving all 
// the middleware and combine reducer 
// logic outside of index.js

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import monitorReducersEnhancer from "./enhancers/monitorReducer"
import loggerMiddleware from './middleware/logger'

import EdgeContextReducers from "./Features/EdgeContext/reducers/EdgeContextReducers"

 const rootReducer = combineReducers( EdgeContextReducers );


export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}