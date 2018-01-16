import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { updateOrderStatusThunk } from '../store'

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
                                <div>
                                { order.status !== 'Completed' &&
                                  <select key={order.id} id={order.id} name="status" onChange={props.handleClick}>
                                  <option key="0" value="Created" >Created</option>
                                  <option key="1" value="Processing" >Processing</option>
                                  <option key="2" value="Cancelled" >Cancelled</option>
                                  <option key="3" value="Completed" >Completed</option>
                                </select>
                              }
                              </div>
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

const mapDispatch = function(dispatch) {
    return {
        handleClick(evt){
            evt.preventDefault()
            const orderId = evt.target.id
            const status = evt.target.value
            console.log('orderId', orderId)
            console.log('orderStatus', status)
            dispatch(updateOrderStatusThunk(orderId, status))
        }
    }
}

export default connect(mapState, mapDispatch)(AllOrders)
