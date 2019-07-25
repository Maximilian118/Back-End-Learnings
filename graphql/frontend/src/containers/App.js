import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'

import Auth from '../components/Auth/Auth'
import Events from '../components/Events/Events'
import Bookings from '../components/Bookings/Bookings'
import Layout from '../containers/Layout/Layout'

const App = props => {
  return (
    <>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <Route path="/auth" component={Auth} />
          <Route path="/events" component={Events} />
          {props.token && <Route path="/bookings" component={Bookings} />}
        </Switch>
      </Layout>
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(App);
