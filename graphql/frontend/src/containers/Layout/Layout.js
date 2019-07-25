import React from 'react'
import * as classes from './Layout.module.scss'
import Nav from '../../components/Nav/Nav'

const Layout = props =>
  <>
    <Nav />
    <main className={classes.Main}>
      {props.children}
    </main>
  </>

export default Layout