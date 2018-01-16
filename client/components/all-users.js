import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {deleteUserThunk, makeUserAdminThunk, removeAdminStatusThunk} from '../store'

function AllUsers(props) {
    return (
      <div>
      {props.currentUser && !props.currentUser.isAdmin ?
        <h3>Sorry, you don't have access to this page.</h3> :   
        <div>
        
            <h1>All Users</h1>
            <ul>
                {props.currentUser && props.currentUser.isAdmin &&
                    props.allUsers.map(user => {
                        return (
                            <li key={user.id}>
                                <p><b>{user.email}     </b></p>
                               
                                <button id={user.id} className="btn-danger" onClick={props.handleClick}>Delete</button>
                                {(!user.isAdmin) && <button id={user.id} className="btn-success" onClick={props.handleSubmit}>Make Admin</button>}
                                {(user.isAdmin) && <button id={user.id} className="btn-warning" onClick={props.handleRemoveAdmin}>Remove Admin Status</button>}
                            </li>
                        )
                    })
                }
            </ul>
            </div>
            }
        </div>
    )
}

const mapState = function(state) {
    return {
        allUsers: state.allUsers,
        currentUser: state.user
    }
}

const mapDispatch = function(dispatch) {
    return {
        handleClick(evt){
            evt.preventDefault()
            const userId = evt.target.id
            dispatch(deleteUserThunk(userId))
        },
        handleSubmit(evt){
            evt.preventDefault()
            const userId = evt.target.id
            console.log(userId)
            dispatch(makeUserAdminThunk(userId))
        },
        handleRemoveAdmin(evt){
            evt.preventDefault()
            const userId = evt.target.id
            dispatch(removeAdminStatusThunk(userId))
        }
    }

}

export default connect(mapState, mapDispatch)(AllUsers)
