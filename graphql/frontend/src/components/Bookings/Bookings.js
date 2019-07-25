import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/actionCreators'
import BookingsList from './BookingsList/BookingsList'
import Spinner from '../UI/Spinner/Spinner'
import Backdrop from '../Backdrop/Backdrop'
import Modal from '../Modal/Modal'

const Bookings = props => {
  useEffect(() => {
    props.bookings.length >= 0 && props.onBookingsLoad(props.token)
  }, []) // eslint-disable-line

  return (
    <>
      {props.booking &&
        <>
          <Backdrop />
          <Modal title="Cancel Booking">
            <h3>Are you Sure?</h3>
          </Modal>
        </>}
      {props.loading ? <Spinner /> : <BookingsList
        bookings={props.bookings}
        creator={props.userId} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    bookings: state.bookings,
    userId: state.userId,
    token: state.token,
    loading: state.loading,
    booking: state.booking
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBookingsLoad: token => dispatch(actionCreators.populateBookings(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)