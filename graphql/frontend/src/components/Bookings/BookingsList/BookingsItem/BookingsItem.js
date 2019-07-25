import React from 'react'
import * as classes from './BookingsItem.module.scss'

const EventItem = props =>
  <li className={classes.bookings__list_item}>
    <div className={classes.col}>
      <h3>{props.booking.event.title}</h3>
      <div className={classes.row}>
        <p>{`£ ${props.booking.event.price}`}</p>
        <p>{`Created By: ${props.booking.user.email}`}</p>
      </div>
    </div>
    <div className={classes.col}>
      {props.booking.createdAt === props.booking.updatedAt ?
        <p>{`Created At: ${props.booking.createdAt}`}</p> :
        <p>{`Updated At: ${props.booking.updatedAt}`}</p>}
      <button onClick={props.clicked}>Cancel</button>
    </div>
    {props.booking._id === props.creator && <h3>You are the creator</h3>}
  </li>

export default EventItem