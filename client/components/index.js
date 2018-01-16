/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as Homepage} from './homepage'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './all-products'
export {default as SingleProduct} from './single-product.js'
export {EditProductForm, NewProductForm} from './new-product'
export {default as ReviewForm} from './review-form'
export {default as AllUsers} from './all-users.js'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as CheckoutConfirm} from './checkout-confirm'
export {default as OrderHistory} from './order-history' 
export {default as AllOrders} from './all-orders'
export {default as OrderLineItems} from './order-line-items' 
export {default as Dashboard} from './dashboard' 
