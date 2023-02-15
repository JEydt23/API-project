import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { bookingsByIdThunk } from '../../store/bookings'

const SpotBookings = ({ spotDetails }) => {
    // const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // const spot = useSelector(state => state.spot.viewOneSpot)
    // console.log("SPOT === ", spot)
    const bookings = useSelector(state => Object.values(state.booking.viewAllBookings))
    console.log("BOOKINGS STATE ===== ", bookings)

    useEffect(() => {
        dispatch(bookingsByIdThunk(spotDetails.id))
    }, [dispatch, spotDetails.id])

    return (
        <div className='main-container-bookings'>
            {bookings.length === 0 ?
                <div>
                    <h3 style={{ textAlign: 'center' }}>This location does not have any reservations</h3>
                </div> :
                <div>
                    <h3 style={{ textAlign: 'center' }}>Dates already booked for this location:</h3>
                    <div className='spots'>
                        <div className="previewImage">
                            {bookings.map(booking => (
                                <div key={booking.id}>
                                    {/* {console.log("booking", booking)} */}
                                    {/* <h3>ID: {booking.id}</h3> */}
                                    <div className='spots-info'>

                                        <div className='start-end-dates' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {/* <h3>{booking.Spot?.name}</h3> */}
                                            <h4 id='price'>From <span id='night'> {booking.startDate} </span>
                                                to <span id='night'> {booking.endDate}</span></h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>}
        </div>
    )

}

export default SpotBookings
