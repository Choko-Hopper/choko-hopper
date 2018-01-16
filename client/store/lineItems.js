import axios from 'axios'
import history from '../history'

const lineItems = []

const GET_LINE_ITEMS = 'GET_LINE_ITEMS'

const getLineItems = items => ({ type: GET_LINE_ITEMS, items })


export const fetchLineItems = () =>
  dispatch =>
    axios.get(`/api/orders/line-items`)
      .then(res => {
          dispatch(getLineItems(res.data))
      })
      .catch(err => console.log(err))

      export default function (state = lineItems, action) {
        switch (action.type) {
          case GET_LINE_ITEMS:
            return action.items

          default:
            return state
        }
      }
