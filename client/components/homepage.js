import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

export default function Homepage(props){
    return (
        <div>
            {
                <div>
                <div className="container-fluid">
                    <div className="banner row d-flex align-items-stretch">
                        <div className="banner-text col-4">
                            <div><p><b>Choko</b> was founded in 2018 by four chocolatiers with a vision.
                                We sell only the finest, fair-trade products with quality, organic ingredients.</p>
                                <p>Come taste our chocolate today!</p>
                                <i className="fa fa-angle-right" aria-hidden="true" /><Link to="/products">View Products</Link>
                            </div>
                        </div>
                        <div className="col-8 d-flex align-items-stretch"><img src="https://images.pexels.com/photos/209331/pexels-photo-209331.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb" alt="Pexels" /></div>
                        <div className="col-4 d-flex align-items-stretch"><img src="https://images.unsplash.com/photo-1493925410384-84f842e616fb?auto=format&fit=crop&w=1402&q=80" alt="Pexels" /></div>
                    </div>
                </div>
                </div>
             }
        </div>
    
    )
}
