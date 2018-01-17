import axios from 'axios'
import history from '../history'
import { fetchAllUsers, removeAllUsers } from './allUsers'
import { fetchAllOrders } from './allOrders'
import { fetchAllPromoCodes } from './promoCodes'
import { updateUserInfo } from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => {
      dispatch(getUser(res.data || defaultUser))
      if (res.data.isAdmin) dispatch(fetchAllUsers())
        dispatch(updateUserInfo({userEmail: res.data.email}))
    })
    .catch(err => console.log(err))

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data))
        if (res.data.isAdmin) {
          dispatch(fetchAllUsers())
          dispatch(fetchAllOrders())
          dispatch(fetchAllPromoCodes())
        }
        dispatch(updateUserInfo({userEmail: res.data.email}))
        history.push('/home')
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      dispatch(removeAllUsers())
      dispatch(updateUserInfo({userEmail: ''}))
      history.push('/login')
    })
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser

    default:
      return state
  }
}
