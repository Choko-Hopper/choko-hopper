import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

export default function Homepage(props){
    return(
        <div>
            {
                <div>
                <h5><b>Choko-Hopper</b> was founded in 2018 by four chocolatiers with a vision.
                <p>We sell only the finest, fair-trade products with quality, organic ingredients.</p>
                <p>Come taste our chocolate today!</p></h5>
                <Link to="/products"><img src="https://images.pexels.com/photos/209331/pexels-photo-209331.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb" width="900" height="500" alt="Pexels"></img></Link>
                </div>
             }
        </div>
    
    )
}
