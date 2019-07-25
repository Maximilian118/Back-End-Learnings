import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/actionCreators'
import * as classes from './Modal.module.scss'

const modal = props => {
  const confirmBtnClicked = () => {
    props.onCreateEvent(props.eventFormData, props.token)
    props.onBtnClicked(false)
  }

  const bookBtnClicked = () => {
    props.onBookEvent(props.event._id, props.token)
    props.onBtnClicked(false)
  }

  const cancelBtnClicked = () => {
    props.onCancelBooking(props.booking._id, props.token)
    props.onBtnClicked(false)
  }

  let btn =
    <button className={classes.btn} onClick={confirmBtnClicked}>
      Confirm
    </button>
  if (props.event) {
    btn = <button className={classes.btn} onClick={bookBtnClicked}>
      Book
    </button>
  }
  if (props.booking) {
    btn = <button className={classes.btn} onClick={cancelBtnClicked}>
      Cancel Booking
    </button>
  }


  return (
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <h1>{props.title}</h1>
      </header>
      <section className={classes.modal__content}>
        {props.children}
      </section>
      <section className={classes.modal__actions}>
        <button className={classes.btn} onClick={() => props.onBtnClicked(false)}>
          Cancel
      </button>
        {props.token && btn}
      </section>
    </div >
  )
}

const mapStateToProps = state => {
  return {
    eventFormData: state.eventFormData,
    token: state.token,
    event: state.event,
    booking: state.booking
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBtnClicked: boolean => dispatch(actionCreators.showModal(boolean)),
    onCreateEvent: (eventFormData, token) => dispatch(actionCreators.createEvent(eventFormData, token)),
    onBookEvent: (eventId, token) => dispatch(actionCreators.bookEvent(eventId, token)),
    onCancelBooking: (bookingId, token) => dispatch(actionCreators.cancelBooking(bookingId, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(modal)