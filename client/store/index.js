import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './product'
import reviews from './reviews'
import allUsers from './allUsers'
import cart from './cart'
import allCategories from './allCategories'
import orderHistory from './orderHistory'
import allOrders from './allOrders'


export const reducer = combineReducers({ user, products, reviews, allUsers, cart, allCategories, orderHistory, allOrders })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './reviews'
export * from './allUsers'
export * from './cart'
export * from './allCategories'
export * from './orderHistory'
export * from './allOrders'
