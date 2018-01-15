import axios from 'axios'
import history from '../history'

const orderHistory = []

const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

const getOrderHistory = orders => ({ type: GET_ORDER_HISTORY, orders })


export const fetchOrderHistory = (userId) =>
  dispatch =>
    axios.get(`/api/orders/my-orders/${userId}`)
      .then(res => {
          dispatch(getOrderHistory(res.data))
      })
      .catch(err => console.log(err))

      export default function (state = orderHistory, action) {
        switch (action.type) {
          case GET_ORDER_HISTORY:
            return action.orders

          default:
            return state
        }
      }
