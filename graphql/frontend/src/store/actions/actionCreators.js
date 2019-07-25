import * as actionTypes from './actionTypes'
import { headers } from '../../shared/utility'
import axios from 'axios'

const loading = () => {
  return {
    type: actionTypes.LOADING
  }
}

const authSuccess = data => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: data.userId,
    userEmail: data.userEmail,
    token: data.token,
    tokenExpiration: data.tokenExpiration
  }
}

const requestFail = err => {
  return {
    type: actionTypes.REQUEST_FAIL,
    error: err
  }
}

export const auth = (email, pass, btnIsLogin) => {
  return dispatch => {
    dispatch(loading())
    if (btnIsLogin) {
      axios.post('', {
        variables: {
          email: email,
          pass: pass
        },
        query: `
          query Login($email: String!, $pass: String!) {
            login(email: $email, password: $pass) {
              userId
              token
              tokenExpiration
              userEmail
            }
          } `
      }).then(res => res.data.errors ?
        dispatch(requestFail(res.data.errors[0].message)) :
        dispatch(authSuccess(res.data.data.login)))
    } else {
      axios.post('', {
        variables: {
          email: email,
          pass: pass
        },
        query: `
          mutation {
            createUser(userInput: {email: $email, password: $pass}) {
              userId
              token
              tokenExpiration
              userEmail
            }
          } `
      }).then(res => res.data.errors ?
        dispatch(requestFail(res.data.errors[0].message)) :
        dispatch(authSuccess(res.data.data.createUser)))
    }
  }
}

export const showModal = boolean => {
  return {
    type: actionTypes.SHOW_MODAL,
    showModal: boolean
  }
}

export const eventFormChange = (title, price, date, desc) => {
  return {
    type: actionTypes.EVENT_FORM_CHANGE,
    eventFormData: {
      title: title,
      price: price,
      date: date,
      description: desc
    }
  }
}

const createEventSuccess = data => {
  return {
    type: actionTypes.CREATE_EVENT_SUCCESS,
    data: data
  }
}

export const createEvent = (eventFormData, token) => {
  const withHeaders = headers(token)
  return dispatch => {
    dispatch(loading())
    axios.post('', {
      query: `
        mutation {
          createEvent(eventInput: {title: "${eventFormData.title}", price: ${eventFormData.price}, 
          date: "${eventFormData.date}", description: "${eventFormData.description}"}) {
            _id
            title
            price
            date
            description
            creator {
              _id
              email
            }
          }
        } `
    }, { headers: withHeaders }).then(res => res.data.errors ?
      dispatch(requestFail(res.data.errors[0].message)) :
      dispatch(createEventSuccess(res.data.data.createEvent)) && dispatch(populateEvents()))
  }
}

const populateEventsSuccess = events => {
  return {
    type: actionTypes.POPULATE_EVENTS_SUCCESS,
    events: events
  }
}

export const populateEvents = () => {
  return dispatch => {
    dispatch(loading())
    axios.post('', {
      query: `
        query {
          events {
            _id
            title
            price
            date
            description
            creator {
              _id
              email
            }
          }
        } `
    }).then(res => res.data.errors ?
      dispatch(requestFail(res.data.errors[0].message)) :
      dispatch(populateEventsSuccess(res.data.data.events)))
  }
}

export const eventBtnClicked = event => {
  return {
    type: actionTypes.EVENT_BTN_CLICKED,
    event: event
  }
}

const bookEventSuccess = booking => {
  return {
    type: actionTypes.BOOK_EVENT_SUCCESS,
    booking: booking
  }
}

export const bookEvent = (eventId, token) => {
  const withHeaders = headers(token)
  return dispatch => {
    dispatch(loading())
    axios.post('', {
      query: `
        mutation {
          bookEvent(eventId: "${eventId}") {
            _id
            createdAt
            updatedAt
          }
        } `
    }, { headers: withHeaders }).then(res => res.data.errors ?
      dispatch(requestFail(res.data.errors[0].message)) :
      dispatch(bookEventSuccess(res.data.data.bookEvent)))
  }
}

const populateBookingsSuccess = bookings => {
  return {
    type: actionTypes.POPULATE_BOOKINGS_SUCCESS,
    bookings: bookings
  }
}

export const populateBookings = token => {
  const withHeaders = headers(token)
  return dispatch => {
    dispatch(loading())
    axios.post('', {
      query: `
        query {
          bookings {
            _id
            createdAt
            updatedAt
            event {
              title
              price
              description
            }
            user {
              email
            }
          }
        } `
    }, { headers: withHeaders }).then(res => res.data.errors ?
      dispatch(requestFail(res.data.errors[0].message)) :
      dispatch(populateBookingsSuccess(res.data.data.bookings)))
  }
}

export const bookingBtnClicked = booking => {
  return {
    type: actionTypes.BOOKING_BTN_CLICKED,
    booking: booking
  }
}

const cancelBookingSuccess = () => {
  return {
    type: actionTypes.CANCEL_BOOKING_SUCCESS
  }
}

export const cancelBooking = (bookingId, token) => {
  const withHeaders = headers(token)
  return dispatch => {
    dispatch(loading())
    axios.post('', {
      query: `
        mutation {
          cancelBooking(bookingId: "${bookingId}") {
            _id
          }
        } `
    }, { headers: withHeaders }).then(res => res.data.errors ?
      dispatch(requestFail(res.data.errors[0].message)) :
      dispatch(cancelBookingSuccess()) && dispatch(populateBookings(token)))
  }
}

export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT
  }
}