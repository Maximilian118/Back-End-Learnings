import React from 'react'
import * as classes from './EventItem.module.scss'

const EventItem = props =>
  <li className={classes.events__list_item}>
    {`${props.event.title} £${props.event.price}`}
    {props.event.creator._id === props.creator ? <h3>You are the creator</h3> :
      <button className="btn" onClick={props.clicked}>View Details</button>}
  </li>

export default EventItem