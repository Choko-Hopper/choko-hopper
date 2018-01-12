import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

function AllUsers(props) {
    console.log(props.currentUser, "PROPS.CURRENTUSER!!!!")
    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {props.currentUser && props.currentUser.isAdmin &&
                    props.allUsers.map(user => {
                        return (
                            <li key={user.id}>
                                <span>{user.email}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapState = function(state) {
    return {
        allUsers: state.allUsers,
        currentUser: state.user
    }
}


export default connect(mapState, null)(AllUsers)
