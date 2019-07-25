import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreators from '../../store/actions/actionCreators'
import * as classes from './Auth.module.scss'

const Auth = props => {
  const [btnIsLogin, setBtnIsLogin] = useState(false)
  const [emailVal, setEmailVal] = useState(null)
  const [passVal, setPassVal] = useState(null)

  if (props.token) {
    return <Redirect to="/events" />
  }

  const submitHandler = event => {
    event.preventDefault()
    if (emailVal.trim().length === 0 || passVal.trim().length === 0) {
      return
    }
    props.onButtonClicked(emailVal, passVal, btnIsLogin)
  }

  const btnSwitch = () => {
    setBtnIsLogin(!btnIsLogin)
  }

  return (
    <form className={classes.Form} onSubmit={event => submitHandler(event)}>
      <h2>Sign Up or Log In</h2>
      <label htmlFor="email">Email</label>
      <input onChange={event => setEmailVal(event.target.value)} type="email" id="email"></input>
      <label htmlFor="password">Password</label>
      <input onChange={event => setPassVal(event.target.value)} type="password" id="password"></input>
      <div >
        <button onClick={btnSwitch} type="button">Switch to Login</button>
        {btnIsLogin ? <button type="submit">Log In</button> : <button type="submit">Sign Up</button>}
      </div>
    </form >
  )
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onButtonClicked: (email, pass, btnIsLogin) => dispatch(actionCreators.auth(email, pass, btnIsLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)