import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  fetchAllPromoCodes,
  deletePromoCodeThunk,
  addNewPromoCodeThunk
} from "../store";

function PromoCodes(props) {
  return (
    <div>
      {props.currentUser && !props.currentUser.isAdmin ? (
        <h3>Sorry, you don't have access to this page.</h3>
      ) : (
        <div>
          <h1>Active Promo Codes</h1>
          <form onSubmit={props.handleSubmit}>
            <div>
              <label htmlFor="promo">
                <small>Add a New Code</small>
              </label>
              <input name="promo" type="text" />
            </div>
            <div>
              <label htmlFor="discount">
                <small>Percentage Off</small>
              </label>
              <input name="discount" type="text" />
            </div>
            <button type="submit" className="btn-success">
              Submit
            </button>
          </form>
          <ul>
            {props.currentUser &&
              props.currentUser.isAdmin &&
              props.promoCodes.map(code => {
                return (
                  <li key={code.id}>
                    <p>
                      <b>Code: </b>
                      {code.code}{" "}
                    </p>
                    <p>
                      <b>Discount: </b>
                      {code.percentOff}%
                    </p>
                    <button
                      id={code.id}
                      className="btn-danger"
                      onClick={props.handleDelete}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

const mapState = function(state) {
  return {
    promoCodes: state.promoCodes,
    currentUser: state.user
  };
};

const mapDispatch = function(dispatch) {
  return {
    handleDelete(evt) {
      evt.preventDefault();
      const promoCodeId = evt.target.id;
      dispatch(deletePromoCodeThunk(promoCodeId));
    },
    handleSubmit(evt) {
      evt.preventDefault();
      const newPromoCode = {
        code: evt.target.promo.value,
        percentOff: evt.target.discount.value
      };
      dispatch(addNewPromoCodeThunk(newPromoCode));
    }
  };
};

export default connect(mapState, mapDispatch)(PromoCodes);
