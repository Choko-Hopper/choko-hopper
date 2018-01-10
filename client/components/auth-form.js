import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { auth } from "../store"

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordError: ""
    }
  }
  render() {
    const { name, displayName, error } = this.props
    const handleSubmit = this.props.handleSubmit.bind(this)
    const isSignUp = this.props.name === "signup"

    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          {isSignUp && (
            <div>
              <label htmlFor="password">
                <small>Re-Enter Password</small>
              </label>
              <input name="password2" type="password" />
            </div>
          )}
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
          <div>{this.state.passwordError} </div>
        </form>
        <a href="/auth/google">{displayName} with Google</a>
        <a href="/auth/facebook">{displayName} with Facebook</a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const password2 = evt.target.password2.value
      if (formName === "signup" && password !== password2) {
        this.setState({ passwordError: "Passwords Do Not Match" })
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
