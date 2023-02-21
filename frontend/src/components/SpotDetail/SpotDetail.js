import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteSpot, getOneSpot } from '../../store/spots';
import GetReviewsBySpot from '../Reviews';
import SpotBookings from './SpotBookings';
import aircover from '../Navigation/Images/aircover.png'


import './SpotDetail.css'
import CreateABooking from './CreateBooking';
import SimpleMap from './GoogleMaps';


const SpotDetail = ({ spotDetails }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotImage = spotDetails.SpotImages;
    const currentUser = useSelector(state => state.session.user);

    useEffect(()=> {
        dispatch(getOneSpot(spotDetails.id))
    }, [dispatch, spotDetails.id])


    if (!spotImage) return null;

    let starRating;
    if (spotDetails.avgStarRating) {
        starRating = `★ ${spotDetails.avgStarRating}`
    } else {
        starRating = `☆ 0`
    }

    let youMessage;
    if (currentUser?.id === spotDetails?.ownerId) {
        youMessage = '(This is your spot)'
    } else {
        youMessage = ''
    }


    const handleDelete = async (e) => {
        e.preventDefault();

        await history.push('/')
        await dispatch(deleteSpot(spotDetails.id))

    }
    // console.log(spotDetails)
    return (
        <div>
            <div className='spotDetails'>

                <h1 className='spot-name-h1'>{spotDetails.name}</h1>
                <p className='stars-number'>{starRating} · {spotDetails.numReviews} Review(s) · 🏅 Superhost · {spotDetails.city}, {spotDetails.country} · ${spotDetails.price} a Night</p>
                <div className='spot-image'>
                    <img src={spotDetails.SpotImages[0].url} alt={spotDetails.name} id='spotDetailImage'></img>
                </div>
                <div className='left-right-container'>

                    <div className='details-left'>
                        <div className='hosted-and-buttons'>
                            <div className='hosted-by'>
                                <div className='host-and-details'>
                                    <h2 className='host-name'>{spotDetails.name} is hosted by {spotDetails.Owner.firstName} </h2>
                                    <h2 className='host-name'>{youMessage}</h2>
                                    <p>4 guests · 3 bedrooms · 4 beds · 3 bath</p>
                                </div>

                            </div>
                        </div>
                        <div className='spot-details-buttons'>
                            {(currentUser && (currentUser.id === spotDetails.ownerId) && <button className="spot-delete-button" onClick={handleDelete}
                            >Delete Spot</button>)}
                            <NavLink exact to={`/spots/${spotDetails.id}/edit`}>
                                {(currentUser && (currentUser.id === spotDetails.ownerId) && <button className='spot-edit-button'>
                                    Edit Spot
                                </button>)}
                            </NavLink>
                        </div>

                        <div className='address-review-div'>
                            <div className='address-extraDetails'>
                                <div className='extra-details-with-emojis'>
                                    <div className='emoji-extra-details'>
                                        <h4>💻 Great for remote work</h4>
                                        <p className='emojitext'>Fast wifi at 120Mbps, plus a dedicated workspace in a private room.</p>
                                    </div>
                                    <div className='emoji-extra-details'>
                                        <h4>🚪 Self check-in</h4>
                                        <p className='emojitext'>Check yourself in with the keypad</p>
                                    </div>
                                    <div className='emoji-extra-details'>
                                        <h4>📅 Free cancellation for 48 hours</h4>
                                    </div>
                                </div>
                                <div className='aircover'>
                                    <img src={aircover} alt='aircover logo'></img>
                                    <p className='aircovertext'>Every booking includes free
                                        protection from Host cancellations, listing inaccuracies,
                                        and other issues like trouble checking in.</p>

                                </div>
                                <div className='spotAddress'> Located at {spotDetails.address}, {spotDetails.city}, {spotDetails.state}
                                    <div>{spotDetails.description}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{}}>
                                    {/* <SpotBookings  spotDetails={spotDetails} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='create-booking-div'> */}
                    <CreateABooking spotDetails={spotDetails} />
                    {/* </div> */}
                </div>
                <div className='spot-reviews-container'>
                    <GetReviewsBySpot spotDetails={spotDetails} />
                <div style={{ height: '80%', width: '80%', paddingTop: '25px' }}>
                    <SimpleMap spotDetails={spotDetails}/>

                </div>
                </div>
            </div>

        </div >
    )
}

export default SpotDetail;
