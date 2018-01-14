import axios from 'axios'
import history from '../history'

const allUsers = []

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const REMOVE_ALL_USERS = 'REMOVE_ALL_USERS'

export const getUsers = users => ({ type: GET_USERS, users })
export const deleteUser = userId => ({ type: DELETE_USER, userId })
export const removeAllUsers = () => ({ type: REMOVE_ALL_USERS })


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

export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return [...allUsers, ...action.users]
    case DELETE_USER:
      return state.filter(user => {
        return user.id !== +action.userId
            })
    case REMOVE_ALL_USERS:
      return []
    default:
      return state
  }
}
