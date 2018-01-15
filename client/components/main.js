import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {AllProducts, AllUsers, Homepage, AllOrders} from '../components'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, cart, user} = props

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/home" id="title">Choko</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#top-nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse d-flex justify-content-end" id="top-nav">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true" />({cart.length})</Link></li>
            { props.user && props.user.isAdmin &&
              <li className="dropdown">
                <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/new-product">Add New Product</Link>
                  <Link to="/users">All Users</Link>
                  <Link to="/orders">All Orders</Link>
                </div>
              </li>
            }
            { isLoggedIn
                ? <div>
                  {/* The navbar will show these links after you log in */}
                  <li className="dropdown">
                    <a className="dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-cog" aria-hidden="true" />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                      <Link to={`/order-history/${user.id}`}>Previous Orders</Link>
                    </div>
                  </li>
                  <li><a href="#" onClick={handleClick}>Logout</a></li>
                </div>
                : <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
            }
          </ul>
        </div>
      </nav>
      <hr className="hr-nav" />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
