import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

function AllOrders(props) {

    return (
        <div>
        {props.currentUser && !props.currentUser.isAdmin ?
            <h3>Sorry, you don't have access to this page.</h3> :   
            <div>
            <h1>All Orders</h1>
            <ul>
            {props.currentUser && props.currentUser.isAdmin && props.allOrders.map(order => {
                        return (
                            <li key={order.id}>
                                <p><b>Order Id:</b> #{order.id}     </p>
                                <p><b>Email:</b> {order.userEmail} </p>
                                <p><b>Shipping Address:</b> {order.shippingAddress}</p>
                                <p><b>Status:</b> {order.status}</p>
                               
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
        allOrders: state.allOrders,
        currentUser: state.user
    }
}

// const mapDispatch = function(dispatch) {
//     return {
//         handleClick(evt){
//             evt.preventDefault()
//             const userId = evt.target.id
//             dispatch(deleteUserThunk(userId))
//         }
//     }
// }

export default connect(mapState, null)(AllOrders)
