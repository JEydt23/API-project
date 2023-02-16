import { csrfFetch } from "./csrf"

const ALL_BOOKINGS_SPOT = 'bookings/ALL_BOOKINGS_SPOT'
const ALL_BOOKINGS_USER = 'bookings/ALL_BOOKINGS_USER'
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const DELETE_BOOKING = "bookings/DELETE_BOOKING"

const allBookingsById = bookings => {
    return {
        type: ALL_BOOKINGS_SPOT,
        bookings
    }
}

const allBookingsByUser = bookings => {
    return {
        type: ALL_BOOKINGS_USER,
        bookings
    }
}

const createBooking = booking => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

const deleteBooking = booking => {
    return {
        type: DELETE_BOOKING,
        booking
    }
}

// THUNKS

export const bookingsByIdThunk = spotId => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const bookings = await response.json()
        dispatch(allBookingsById(bookings))
        return bookings
    }
}

export const bookingsByUserThunk = () => async dispatch => {
    const response = await fetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json()
        dispatch(allBookingsByUser(bookings))
        return bookings
    }
}

export const createBookingThunk = (booking, spotId) => async dispatch => {
    console.log("booking in thunk", booking)
    console.log("spotId === ", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(booking)
    })
    console.log("CREATE BOOKINGS THUNK === ", response)
    if (response.ok) {
        const booking = await response.json()
        dispatch(createBooking(booking))
        return booking
    }
}

export const deleteBookingThunk = booking => async dispatch => {

    const response = await csrfFetch(`/api/bookings/${booking}/`, {
        method: 'DELETE'
    })
    console.log("DELETE BOOKINGS THUNK === ", response)

    if (response.ok) {
        dispatch(deleteBooking(booking))
    }
}

// REDUCER

export default function bookingsReducer(state = { viewAllBookings: {}, viewOneBooking: {} }, action) {
    switch (action.type) {
        case ALL_BOOKINGS_SPOT: {
            const newState = { viewAllBookings: {}, viewOneBooking: {} }
            action.bookings.Bookings.forEach(e => {
                newState.viewAllBookings[e.id] = e
            })
            return newState
        }

        case ALL_BOOKINGS_USER: {
            const newState = { viewAllBookings: {}, viewOneBooking: {} }
            action.bookings.Bookings.forEach(e => {
                newState.viewAllBookings[e.id] = e
            })
            return newState
        }

        case CREATE_BOOKING: {
            const newState = { ...state, viewAllBookings: { ...state.viewAllBookings }, viewOneBooking: { ...state.viewOneBooking } }
            newState.viewAllBookings[action.booking.id] = action.booking
            return newState
        }


        case DELETE_BOOKING: {
            const newState = { ...state, viewAllBookings: { ...state.viewAllBookings }, viewOneBooking: { ...state.viewOneBooking } }
            delete newState.viewAllBookings[action.booking]
            return newState
        }

        default:
            return state
    }
}
