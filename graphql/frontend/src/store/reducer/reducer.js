import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../../shared/utility'

const initialState = {
  userId: null,
  userEmail: null,
  token: null,
  tokenExpiration: null,
  error: null,
  showModal: false,
  event: null,
  eventFormData: null,
  eventCreated: null,
  events: [],
  bookings: [],
  booking: null,
  loading: false
}

const authSuccess = (userId, userEmail, token, expiration) => {
  return {
    userId: userId,
    userEmail: userEmail,
    token: token,
    tokenExpiration: expiration,
    loading: false
  }
}

const logOut = () => {
  return {
    userId: null,
    userEmail: null,
    token: null,
    tokenExpiration: null,
    error: null,
    showModal: false,
    event: null,
    eventFormData: null,
    eventCreated: null,
    events: [],
    bookings: [],
    booking: null,
    loading: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return updateState(state, authSuccess(action.userId, action.userEmail, action.token, action.tokenExpiration))
    case actionTypes.REQUEST_FAIL: return updateState(state, { error: action.error, loading: false })
    case actionTypes.SHOW_MODAL: return updateState(state, { showModal: action.showModal, event: null, booking: null })
    case actionTypes.EVENT_FORM_CHANGE: return updateState(state, { eventFormData: action.eventFormData })
    case actionTypes.CREATE_EVENT_SUCCESS: return updateState(state, { eventFormData: null, eventCreated: action.data.data, loading: false })
    case actionTypes.POPULATE_EVENTS_SUCCESS: return updateState(state, { events: action.events, loading: false })
    case actionTypes.LOADING: return updateState(state, { loading: true })
    case actionTypes.EVENT_BTN_CLICKED: return updateState(state, { event: action.event })
    case actionTypes.BOOK_EVENT_SUCCESS: return updateState(state, { loading: false })
    case actionTypes.POPULATE_BOOKINGS_SUCCESS: return updateState(state, { bookings: action.bookings, loading: false })
    case actionTypes.BOOKING_BTN_CLICKED: return updateState(state, { booking: action.booking })
    case actionTypes.CANCEL_BOOKING_SUCCESS: return updateState(state, { booking: null, loading: false })
    case actionTypes.LOG_OUT: return updateState(state, logOut())
    default: return state;
  }
}

export default reducer