import axios from 'axios'
import history from '../history'

const allUsers = []

const GET_USERS = 'GET_USERS'

const REMOVE_ALL_USERS = 'REMOVE_ALL_USERS'

const getUsers = users => ({ type: GET_USERS, users })

export const removeAllUsers = () => ({ type: REMOVE_ALL_USERS })

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
    case REMOVE_ALL_USERS:
      return []
    default:
      return state
  }
}
