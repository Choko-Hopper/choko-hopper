import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import OrderHistory from './order-history'
import OrderLineItems from './order-line-items'
import AllUsers from './all-users'
import AllOrders from './all-orders'
import AllProducts from './all-products'
import Graph from './graph'
import {NewProductForm} from './new-product'
import PromoCodes from './promo-codes'
import UserHome from './user-home'

/**
 * COMPONENT
 */
const Dashboard = props => {
  let orderDetails
  let sidebarLinksArr
  let panelArr
  let subStrArr = []

  if (props.user.isAdmin) {
    orderDetails = props.match.params.orderId ? (
      <OrderLineItems
        userId={props.user.id}
        match={props.match}
        history={props.history}
      />
    ) : (
      <OrderHistory userId={props.user.id} history={props.history} />
    )
    sidebarLinksArr = [
      'Order History',
      'Manage Users',
      'View All Orders',
      'Add Product',
      'Edit Products',
      'Statistics',
      'Manage Promo Codes'
    ]
    panelArr = [
      orderDetails,
      <AllUsers key="allusers" />,
      <AllOrders key="allorders" />,
      <NewProductForm key="newproduct"/>,
      <AllProducts key="allproducts" path={props.path} />,
      <Graph key="graph" />,
      <PromoCodes key="promo" />
    ]
  } else {
    orderDetails = props.match.params.orderId ? (
      <OrderLineItems
        userId={props.user.id}
        match={props.match}
        history={props.history}
      />
    ) : (
      <OrderHistory userId={props.user.id} history={props.history} />
    )
    sidebarLinksArr = ['Order History']
    panelArr = [orderDetails]
  }
  return (
    <div className="container">
      <div className="admin-panel row d-flex align-items-stretch">
        <div className="sidebar col-3">
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              className="nav-link active"
              id="v-pills-userinfo-tab"
              data-toggle="pill"
              href="#v-pills-userinfo"
              role="tab"
              aria-controls="v-pills-userinfo"
              aria-selected="false"
            >
              User Info
            </a>
            {sidebarLinksArr.map(link => {
              let substr = link.replace(/\s+/g, '-').toLowerCase()
              subStrArr.push(substr)
              return (
                <a
                  key={substr}
                  className="nav-link"
                  id={`v-pills-${substr}-tab`}
                  data-toggle="pill"
                  href={`#v-pills-${substr}`}
                  role="tab"
                  aria-controls={`v-pills-${substr}`}
                  aria-selected="true"
                >
                  {link}
                </a>
              )
            })}
          </div>
        </div>
        <div className="col-9">
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-userinfo"
              role="tabpanel"
              aria-labelledby="v-pills-userinfo-tab"
            ><UserHome /></div>
            {panelArr.map((panel, i) => {
              return (
                <div
                  key={subStrArr[i]}
                  className="tab-pane fade"
                  id={`v-pills-${subStrArr[i]}`}
                  role="tabpanel"
                  aria-labelledby={`v-pills-${subStrArr[i]}-tab`}
                >
                  {panel}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    path: ownProps.match.path
  }
}

export default connect(mapStateToProps)(Dashboard)
