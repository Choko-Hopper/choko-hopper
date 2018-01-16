import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import OrderHistory from './order-history'
import OrderLineItems from './order-line-items'

/**
 * COMPONENT
 */
const Dashboard = (props) => {
    console.log(props)
    let orderDetails
    let sidebarLinksArr

    if (props.user.isAdmin) {
        orderDetails = props.match.params.orderId ? <OrderLineItems userId={props.user.id} match={props.match} history={props.history} /> : <OrderHistory userId={props.user.id} history={props.history} />
        sidebarLinksArr = ['Personal Info', 'Order History', 'Authorized Users', 'All Orders']
    } else  {
        orderDetails = props.match.params.orderId ? <OrderLineItems userId={props.user.id} match={props.match} history={props.history} /> : <OrderHistory userId={props.user.id} history={props.history} />
        sidebarLinksArr = ['Personal Info', 'Order History']
    }
    return (
            <div className="container">
                <div className="admin-panel row d-flex align-items-stretch">
                    <div className="sidebar col-3">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link active" id="v-pills-userinfo-tab" data-toggle="pill" href="#v-pills-userinfo" role="tab" aria-controls="v-pills-userinfo" aria-selected="false">User Info</a>
                            <a className="nav-link" id="v-pills-order-tab" data-toggle="pill" href="#v-pills-order" role="tab" aria-controls="v-pills-order" aria-selected="true">Order History</a>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-userinfo" role="tabpanel" aria-labelledby="v-pills-userinfo-tab"></div>
                            <div className="tab-pane fade" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab">{orderDetails}</div>
                            </div>
                    </div>
                </div>
            </div>
        )
}

function mapStateToProps (state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Dashboard)

