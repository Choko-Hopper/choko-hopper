import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {
  Main,
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  NewProductForm,
  EditProductForm,
  AllUsers,
  Cart,
  Checkout,
  CheckoutConfirm,
  Homepage,
  OrderHistory,
  AllOrders,
  Dashboard,
  Graph,
  OrderLineItems,
  PromoCodes
} from './components'
import { me, products, fetchCart, categories, fetchAllOrders, fetchAllPromoCodes } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, currentUser } = this.props

    return (

      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/home" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/edit-product/:productId"
              component={EditProductForm}
            />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route exact path="/new-product" component={NewProductForm} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/orders" component={AllOrders} />
            <Route exact path="/promo-codes" component={PromoCodes} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/order-history/:userId" component={OrderHistory} />
            <Route exact path="/graph" component={Graph} />
            <Route exact path="/order-history/:userId/:orderId" component={OrderLineItems} />
            <Route exact path="/checkout-confirm/:orderId" component={CheckoutConfirm} />
            {isLoggedIn && (
              <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/account" component={Dashboard} />
              <Route exact path="/account/orders" component={Dashboard} />
              <Route exact path="/account/orders/:orderId" component={Dashboard} />
              <Route component={Homepage} />
              </Switch>
            )}

            {/* Displays our Login component as a fallback */}
            <Route component={Homepage} />

          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    currentUser: state.user,
    users: state.users
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(products())
      dispatch(fetchCart())
      dispatch(categories())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
