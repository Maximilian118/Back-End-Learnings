import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../store/actions/actionCreators'
import * as classes from './BookingsList.module.scss'
import BookingsItem from './BookingsItem/BookingsItem'

const BookingsList = props =>
  <ul className={classes.bookings__list}>
    {props.bookings.map(booking =>
      <BookingsItem
        key={booking._id}
        creator={props.creator}
        booking={booking}
        clicked={() => props.onBtnClicked(booking)} />)}
  </ul>

const mapDispatchToProps = dispatch => {
  return {
    onBtnClicked: booking => dispatch(actionCreators.bookingBtnClicked(booking))
  }
}

export default connect(null, mapDispatchToProps)(BookingsList)