import axios from 'axios'
import history from '../history'
import { products } from './index';

const allUsers = []

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const REMOVE_ALL_USERS = 'REMOVE_ALL_USERS'
const MAKE_USER_ADMIN = 'MAKE_USER_ADMIN'
const REMOVE_ADMIN_STATUS = 'REMOVE_ADMIN_STATUS'

export const getUsers = users => ({ type: GET_USERS, users })
export const deleteUser = userId => ({ type: DELETE_USER, userId })
export const removeAllUsers = () => ({ type: REMOVE_ALL_USERS })
export const makeUserAdmin = user => ({type: MAKE_USER_ADMIN, user})
export const removeAdminStatus = user => ({type: REMOVE_ADMIN_STATUS, user})


export const deleteUserThunk = (userId) =>
  dispatch =>
     axios.delete(`/api/users/${userId}`)
       .then(res =>
          dispatch(deleteUser(userId)))
      .catch(err => console.log(err))


export const fetchAllUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(res => dispatch(getUsers(res.data)))
    .catch(err => console.log(err))
}

export const makeUserAdminThunk = (userId) => 
dispatch =>
  axios.put(`/api/users/make-admin/${userId}`, userId)
    .then(res => 
      //console.log(res, "RES"))
    dispatch(makeUserAdmin(res.data)))
    .catch(err => console.log(err))

export const removeAdminStatusThunk = (userId) => 
dispatch => 
  axios.put(`/api/users/remove-admin/${userId}`, userId)
      .then(res =>
      dispatch(removeAdminStatus(res.data)))
      .catch(err => console.log(err))

export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return [...allUsers, ...action.users]
    case DELETE_USER:
      return state.filter(user => {
        return user.id !== +action.userId
            })
    case MAKE_USER_ADMIN:
        let index = state.findIndex(user => {
          return user.id === +action.user.id
           })
         let copyUsers = state.slice(0)   
            copyUsers[index] = action.user
              return copyUsers
    case REMOVE_ADMIN_STATUS:
        let idx = state.findIndex(user => {
          return user.id === +action.user.id
           })
         let copyUsersArr = state.slice(0)   
            copyUsersArr[idx] = action.user
              return copyUsersArr

    case REMOVE_ALL_USERS:
      return []
    default:
      return state
  }
}
