import axios from 'axios'
import history from '../history'
import {products} from './product'
const allOrders = []

const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'


export const getOrders = orders => ({ type: GET_ORDERS, orders })
export const updateOrderStatus = order => ({ type: UPDATE_ORDER_STATUS, order})


export const fetchAllOrders = () => dispatch => {
  axios
    .get('/api/orders')
    .then(res => dispatch(getOrders(res.data || allOrders)))
    .catch(err => console.log(err))
}

export const updateOrderStatusThunk = (orderId, status) => dispatch => {
  axios
    .put(`/api/orders/update-status/${orderId}`, {status})
    .then(res => {
      console.log('Inside of the updateOrderStatusThunk')
      dispatch(updateOrderStatus(res.data))
    })
    .then(dispatch(products()))
    .catch(err => console.log(err))
}

export default function(state = allOrders, action) {

  switch (action.type) {
    case GET_ORDERS:
      return [...allOrders, ...action.orders]
    case UPDATE_ORDER_STATUS:
    let index = state.findIndex(order => {
      return order.id === +action.order.id
    })
    let copyOrders = state.slice(0)
        copyOrders[index] = action.order
        return copyOrders

    default:
      return state
  }
}
