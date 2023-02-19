import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { bookingsByUserThunk, deleteBookingThunk } from '../../store/bookings'
import moment from "moment"
import './UserBookings.css'

const UserBookings = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // const spots = useSelector(state => Object.values(state.spot?.viewAllSpots))
    // console.log("SPOTS === ", spots)
    const bookings = useSelector(state => Object.values(state.booking.viewAllBookings))
    const upcomingBookings = bookings.filter(booking => moment(new Date()).diff(moment(booking.startDate), 'day') <= 0)
    const pastBookings = bookings.filter(booking => moment(new Date()).diff(moment(booking.startDate), 'day') > 0)

    // console.log("BOOKINGS STATE IN USER BOOKINGS ===== ", bookings)
    useEffect(() => {
        dispatch(bookingsByUserThunk(id))
    }, [dispatch, id])

    return (
        <div>
            <div>
                <div id='giant-box1'>
                    <h1 style={{ paddingTop: '75px', textAlign: 'center' }}>Upcoming booking(s) for {user.firstName} {user.lastName}</h1>
                    <div className='spots1'>
                    {upcomingBookings.map(booking => (
                        <div key={`upcoming${booking.id}`}>
                            <div className='spots-info1'>
                                <NavLink to={`/spots/${booking.spotId}`}>
                                    <img src={booking.previewImage} alt="previewImage" id="spotImage"></img>
                                </NavLink>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h3>{booking.Spot?.name}</h3>
                                    <h4 id='price'>Start Date: <span id='night'> {booking.startDate} </span></h4>
                                    <h4 id='price'>End Date: <span id='night'> {booking.endDate}</span></h4>
                                    <button className='delete-spot-booking' onClick={async (e) => {
                                        e.preventDefault()
                                        dispatch(deleteBookingThunk(booking.id))
                                    }} >Delete Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div>
                    <div id='giant-box1'>
                        <h1 style={{ textAlign: 'center' }}>Past Bookings</h1>
                        <div className='spots2'>
                            {pastBookings.map(booking => (
                                <div key={`past${booking.id}`} >
                                    <div className='spots-info2'>
                                        <NavLink to={`/spots/${booking.spotId}`}>
                                            <img src={booking.previewImage} alt="previewImage" id="spotImage"></img>
                                        </NavLink>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <h3>{booking.Spot?.name}</h3>
                                            <h4 id='price'>Start Date: <span id='night'> {booking.startDate} </span></h4>
                                            <h4 id='price'>End Date: <span id='night'> {booking.endDate}</span></h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserBookings
