import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBookingThunk } from "../../store/bookings"
import 'react-dates/initialize';
import moment from "moment"
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './CreateBooking.css'

function CreateABooking({ spotDetails }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const bookings = useSelector(state => Object.values(state.booking.viewAllBookings));
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [focusedInput, setFocusedInput] = useState(null);
    const [bookedDates, setBookedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])
    const [showErrors, setShowErrors] = useState(false)
    const [errors, setErrors] = useState([])
    const [ready, setReady] = useState(false)
    const currentUser = useSelector(state => state.session.user)



    useEffect(() => {
        existingBookings(bookings)
    }, [dispatch, bookings])



    useEffect(() => {
        blockedDates.push(bookedDates)
    }, [dispatch, bookedDates])

    useEffect(() => {
        if (startDate && endDate) setReady(true)
        if (!startDate || !endDate) setReady(false)
    }, [startDate, endDate])

    useEffect(() => {
        const endInput = document.getElementById('endDateId')
        if (!startDate) {
            endInput.disabled = true
            setEndDate()
            setStartDate()
        }
    }, [startDate])

    const handleDateChanges = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const blockDates = (day) => {
        const blockedDates = new Set([...bookedDates])
        return blockedDates.has(moment(day).format('YYYY-MM-DD'))
    }

    const existingBookings = (bookings) => {

        bookings.forEach(booking => {
            const { startDate, endDate } = booking
            let date = moment(startDate)
            let dateEnd = moment(endDate)
            while (date < dateEnd) {
                bookedDates.push(moment(new Date(date)).format('YYYY-MM-DD'))
                date.add(1, 'days')
            }
        })
    }

    const checkGapDays = (day) => {
        if (day > moment()) {
            const gapDays = []
            bookings.forEach(booking => gapDays.push(moment(booking.startDate).subtract(1, "days").format('YYYY-MM-DD')))
            return gapDays.find(gapDay => gapDay == day.format('YYYY-MM-DD'))
        }

    }


    const validatedDates = (day) => {

        if (!startDate) {
            return moment(startDate).diff(day, 'days') > 0
        }
        if (startDate) {

            const blockedDates = [...bookedDates]
            let earliestBlockedDate = blockedDates[0]
            for (let i = 1; i < blockedDates.length; i++) {
                if (moment(blockedDates[i]) > moment(startDate) &&
                    moment(blockedDates[i]).diff(day, 'days') < moment(earliestBlockedDate).diff(day, 'days')) {
                    earliestBlockedDate = blockedDates[i]
                }
            }

            if (moment(startDate).diff(earliestBlockedDate, 'days') > 0) {
                return moment(startDate).diff(day, 'days') > 0
            }
            return moment(startDate).diff(day, 'days') > 0 || moment(day).format('YYYY-MM-DD') > earliestBlockedDate
        }
    }

    useEffect(() => {
        const errors = []
        if (startDate?.toString().split(' ').slice(1, 4).join(' ') === endDate?.toString().split(' ').slice(1, 4).join(' ')) errors.push("Must book for at least 1 day")
        if (!startDate) errors.push('Must include Start Date')
        if (!endDate) errors.push('Must include End Date')
        if (!currentUser) errors.push('You must be logged in to book your stay.')
        setErrors(errors)
    }, [startDate, endDate])

    const handleSubmit = async (e) => {
        setShowErrors(true)
        e.preventDefault()
        // console.log('is this hitting')
        if (!errors.length) {
            const values = {
                startDate: moment(startDate).format("MM-DD-YYYY"),
                endDate: moment(endDate).format("MM-DD-YYYY")
            }
            const created = await dispatch(createBookingThunk(values, spotDetails.id))
            if (created) history.push(`/bookings/current`)
        }

    }

    const calendarInfo = (e) => {
        return <div className="calendar-info-bottom">
            <button onClick={handleClearDatesClick}>Clear dates</button>
        </div>
    }

    const handleClearDatesClick = (e) => {
        e.preventDefault()
        setStartDate()
        setEndDate()
        document.getElementById('startDateId').focus()
    }
    console.log("spotDetails === ", spotDetails)
    return (
        <div className="booking-form-container">
            <div className='booking-form-headers'>
                <div className='header-first'>
                    <div className='header-price'>
                        ${spotDetails.price} <span className="night">night</span> </div>
                    <div className='header-right'><span className="avgRat">{`★ ${spotDetails.numReviews ? spotDetails.avgStarRating.toFixed(2) : "New"}`} · {`${spotDetails.numReviews} review(s)`} </span></div>

                </div>


            </div>
            <div className='actual-form'>
                <form
                    className='booking-form'
                    onSubmit={handleSubmit}>
                    <DateRangePicker
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId="startDateId" // PropTypes.string.isRequired,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDateId="endDateId" // PropTypes.string.isRequired,
                        onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                        reopenPickerOnClearDates={startDate}
                        minimumNights={1}
                        minDate={moment(new Date())}
                        isDayBlocked={blockDates}
                        startDatePlaceholderText="Start"
                        endDatePlaceholderText="End"
                        hideKeyboardShortcutsPanel={true}
                        isDayHighlighted={checkGapDays}
                        isOutsideRange={validatedDates}
                        calendarInfoPosition={"bottom"}
                        renderCalendarInfo={calendarInfo}

                    />
                    <button className='booking-btn'>Reserve</button>
                </form>
                <div className='booking-bot'>
                    <div className='bot-content'>
                        <div className='bot-bot'>${spotDetails.price} x {endDate?.diff(startDate, 'days') || 0} nights <span>${spotDetails.price * (endDate?.diff(startDate, 'days') || 0)}</span></div>
                        <div className='bot-bot'>Cleaning fee <span>$100</span></div>
                        <div className='bot-bot' style={{paddingBottom: '20px'}}>Service Fee <span>${((spotDetails.price * 3) * 0.14).toFixed(0)}</span></div>
                        <div className='bot-bot' style={{fontWeight: "bold", borderTop: '1px solid lightgrey', paddingTop: '20px'}}> Total before taxes <span>${+(spotDetails.price * (endDate?.diff(startDate, 'days') || 0)) + +((spotDetails.price * 3) * 0.14).toFixed(0) + 100}</span></div>
                    </div>
                    <div className='login-errors'>
                        {
                            showErrors ?
                                errors.map(error => (
                                    <li style={{color: 'red'}} key={error}>{error}</li>
                                ))
                                : null
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateABooking
