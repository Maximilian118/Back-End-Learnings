import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/actionCreators'
import * as classes from './Events.module.scss'
import Backdrop from '../Backdrop/Backdrop'
import Modal from '../Modal/Modal'
import EventList from './EventList/EventList'
import Spinner from '../UI/Spinner/Spinner'

const Events = props => {
  const [title, setTitle] = useState(null)
  const [price, setPrice] = useState(null)
  const [date, setDate] = useState(null)
  const [desc, setDesc] = useState(null)

  if (title || price || date || desc) {
    props.onInputChange(title, price, date, desc)
  }

  useEffect(() => {
    props.events.length >= 0 && props.onEventsLoad()
  }, []) // eslint-disable-line

  return (
    <>
      {props.event &&
        <>
          <Backdrop />
          <Modal title={props.event.title}>
            <h3>{props.event.price}</h3>
            <h3>{props.event.date}</h3>
            <h3>{props.event.description}</h3>
          </Modal>
        </>}
      {props.showModal &&
        <>
          <Backdrop />
          <Modal title="Add Event">
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Title of the Event!" onChange={event => setTitle(event.target.value)}></input>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" placeholder="Price of the Event!" onChange={event => setPrice(event.target.value)}></input>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" onChange={event => setDate(event.target.value)}></input>
                <label htmlFor="description">Description</label>
                <textarea type="text" id="description" rows="4" placeholder="Description of the event!" onChange={event => setDesc(event.target.value)}></textarea>
              </div>
            </form>
          </Modal>
        </>}
      <div className={classes.eventsControl}>
        {props.token ? <h2>Create An Event!</h2> : <h2>Please Log In!</h2>}
        {props.token && <button className="btn" onClick={() => props.onCreateBtnClicked(true)}>Create Event</button>}
      </div>
      {props.loading ? <Spinner /> : <EventList
        creator={props.userId}
        events={props.events}
      />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    showModal: state.showModal,
    token: state.token,
    events: state.events,
    userId: state.userId,
    loading: state.loading,
    event: state.event
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateBtnClicked: boolean => dispatch(actionCreators.showModal(boolean)),
    onInputChange: (title, price, date, desc) => dispatch(actionCreators.eventFormChange(title, price, date, desc)),
    onEventsLoad: () => dispatch(actionCreators.populateEvents()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)