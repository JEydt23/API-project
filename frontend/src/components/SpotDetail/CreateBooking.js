import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBookingThunk } from "../../store/bookings"

function CreateABooking({ spotDetails }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const bookings = useSelector(state => Object.values(state.booking.viewAllBookings))

    useEffect(() => {
        
    })

}
