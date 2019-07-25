import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/actionCreators'
import { NavLink } from 'react-router-dom'
import * as classes from './Nav.module.scss'

const Nav = props =>
  <header className={classes.Header}>
    <nav className={classes.Nav}>
      <NavLink to="/auth"><h3>EventBooker</h3></NavLink>
      <ul>
        <li><NavLink to="/events">Events</NavLink></li>
        {props.userEmail && <li><NavLink to="/bookings">Bookings</NavLink></li>}
      </ul>
    </nav>
    <div className={classes.Nav}>
      {props.userEmail ?
        <>
          <h3>{props.userEmail}</h3>
          <NavLink to="/auth" onClick={props.onLogOut}>Log Out</NavLink>
        </> :
        <NavLink to="/auth">Log In</NavLink>}
    </div>
  </header>

const mapStateToProps = state => {
  return {
    userEmail: state.userEmail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actionCreators.logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)