import axios from 'axios'
import history from '../history'

const allUsers = []

const GET_USERS = 'GET_USERS'

const getUsers = users => ({ type: GET_USERS, users })

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

    default:
      return state
  }
}
