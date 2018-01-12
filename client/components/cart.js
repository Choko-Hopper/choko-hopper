import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

function Cart(props) {


    return (
        <div>
            <h1>My Cart</h1>
            <ul>
                {props.currentUser &&
                    props.cart.map(cartItem => {
                        let singleProduct = props.products.find((product) => +product.id === +cartItem.productId)

                        //console.log(singleProduct, "SINGLE PRODUCT!!!")
                        console.log(cartItem, "CART ITEM!!!")
                        console.log(props.cart, "PROPS.CART")
                        console.log(props.products, "PROPS.PRODUCTS!!!")
                        return (
                    
                                    <li key={cartItem.productId}>
                                        <p>Name: {singleProduct && singleProduct.name}</p>
                                        <p>Quantity: {cartItem.quantity}</p>
                                        <p>Price: ${cartItem.unitPrice}</p>
                                    </li>
                
                        )

                    })

                }

            </ul>
        </div>
    )
}

//cart-->  [{productId: X, quantity: X, unitPrice: X}]

const mapState = function (state) {
    return {
        products: state.products,
        currentUser: state.user,
        cart: state.cart
    }
}

export default connect(mapState, null)(Cart)