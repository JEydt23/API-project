import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { bookingsByUserThunk } from '../../store/bookings'

const UserBookings = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => Object.values(state.spot?.viewAllSpots))
    console.log("SPOTS === ", spots)
    const bookings = useSelector(state => Object.values(state.booking?.viewAllBookings))
    console.log("BOOKINGS STATE ===== ", bookings)
    useEffect(() => {
        dispatch(bookingsByUserThunk(id))
    }, [dispatch, id])

    return (
        <div>
            {bookings.map(booking => (
                <div key={booking.id} >
                    {console.log("booking", booking)}
                    <h3>ID: {booking.id}</h3>
                    <img src={booking.previewImage} alt="previewImage"></img>
                    <h4>Start Date: {booking.startDate} </h4>
                    <h4>End Date: {booking.endDate}</h4>
                </div>
            ))}
        </div>
    )

}

export default UserBookings
