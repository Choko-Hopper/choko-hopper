import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

function AllUsers(props) {
    console.log(props, "PROPS!!!!")
    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {props.users && props.currentUser && props.currentUser.isAdmin &&
                    props.users.map(user => {
                        return (
                            <li key={user.id}>
                                <span>{user.name}</span>
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
        users: state.users,
        currentUser: state.user
    }
}


export default connect(mapState, null)(AllUsers)
