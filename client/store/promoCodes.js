import axios from 'axios'
import history from '../history'

const allPromoCodes = []

const GET_PROMO_CODES = 'GET_PROMO_CODES'
const DELETE_PROMO_CODE = 'DELETE_PROMO_CODE'
const ADD_NEW_PROMO_CODE = 'ADD_NEW_PROMO_CODE'
const REMOVE_ALL_PROMO_CODES = 'REMOVE_ALL_PROMO_CODES'


export const getPromoCodes = promoCodes => ({ type: GET_PROMO_CODES, promoCodes })
export const deletePromoCode = promoCodeId => ({ type: DELETE_PROMO_CODE, promoCodeId })
export const addNewPromoCode = promoCode => ({ type: ADD_NEW_PROMO_CODE, promoCode })
export const removeAllPromoCodes = () => ({ type: REMOVE_ALL_PROMO_CODES })
export const fetchAllPromoCodes = () => dispatch => {
  axios
    .get('/api/promo')
    .then(res => dispatch(getPromoCodes(res.data)))
    .catch(err => console.log(err))
}

export const deletePromoCodeThunk = (promoCodeId) =>
    dispatch =>
        axios.delete(`api/promo/${promoCodeId}`)
            .then(res =>
                dispatch(deletePromoCode(promoCodeId)))
            .catch(err => console.log(err))

export const addNewPromoCodeThunk = (promoCode) => dispatch => {
    axios
        .post('/api/promo', promoCode)
        .then(res => dispatch(addNewPromoCode(res.data)))

}

export default function(state = allPromoCodes, action) {
  switch (action.type) {
    case GET_PROMO_CODES:
      return [...allPromoCodes, ...action.promoCodes]

    case REMOVE_ALL_PROMO_CODES:
      return []

    case DELETE_PROMO_CODE:
      return state.filter(promoCode => {
          return promoCode.id !== +action.promoCodeId
      })
    case ADD_NEW_PROMO_CODE:
      return [...state, action.promoCode]
    default:
      return state
  }
}
