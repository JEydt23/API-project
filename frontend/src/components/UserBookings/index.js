import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { bookingsByUserThunk } from '../../store/bookings'

const UserBookings = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // const spots = useSelector(state => Object.values(state.spot?.viewAllSpots))
    // console.log("SPOTS === ", spots)
    const bookings = useSelector(state => Object.values(state.booking.viewAllBookings))
    // console.log("BOOKINGS STATE ===== ", bookings)
    useEffect(() => {
        dispatch(bookingsByUserThunk(id))
    }, [dispatch, id])

    return (
        <div>
            <h1 style={{paddingTop: '75px', textAlign: 'center' }}>Booking(s) for {user.firstName} {user.lastName}</h1>
            <div id='giant-box'>
                <div className='spots'>
                    <div className="previewImage">
                        {bookings.map(booking => (
                            <div key={booking.id}>
                                {/* {console.log("booking", booking)} */}
                                {/* <h3>ID: {booking.id}</h3> */}
                                <div className='spots-info'>
                                    <NavLink to={`/spots/${booking.id}`}>

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
    )

}

export default UserBookings
