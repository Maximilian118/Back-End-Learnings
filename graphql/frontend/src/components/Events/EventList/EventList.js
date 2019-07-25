import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../store/actions/actionCreators'
import * as classes from './EventList.module.scss'
import EventItem from './EventItem/EventItem'

const EventList = props =>
  <ul className={classes.events__list}>
    {props.events.map(event =>
      <EventItem
        key={event._id}
        creator={props.creator}
        event={event}
        clicked={() => props.onBtnClicked(event)} />)}
  </ul>

const mapDispatchToProps = dispatch => {
  return {
    onBtnClicked: event => dispatch(actionCreators.eventBtnClicked(event))
  }
}

export default connect(null, mapDispatchToProps)(EventList)