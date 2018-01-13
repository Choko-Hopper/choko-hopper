import axios from 'axios'
import history from '../history'

const allCategories = []

const GET_CATEGORIES = 'GET_CATEGORIES'

const getCategories = categories => ({ type: GET_CATEGORIES, categories })

export const categories = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res =>
        dispatch(getCategories(res.data)))
      .catch(err => console.log(err))

      export default function (state = allCategories, action) {
        switch (action.type) {
          case GET_CATEGORIES:
            return [...allCategories, ...action.categories]

          default:
            return state
        }
      }
