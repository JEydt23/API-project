import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotReviews } from '../../store/reviews';
import CreateReview from '../CreateReview';
import { deleteReviewThunk } from '../../store/reviews';
import { useHistory, useParams } from 'react-router-dom';
import { getOneSpot } from '../../store/spots';
import './Reviews.css'

const GetReviewsBySpot = ({ spotDetails }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spotReviews = useSelector(state => Object.values(state.review.allSpots));
    const spotReviewNoOV = useSelector(state => state.review.allSpots)
    const currentUser = useSelector(state => state.session.user);
    const oneSpot = useSelector(state => state.spot.viewSingleSpot);

    // CODE FOR WHEN NOT LOGGED IN AS RIGHT USER
    let value;
    let reviewed;
    let starRating;
    if (spotDetails.avgStarRating) {
        starRating = `★ ${spotDetails.avgStarRating}`
    } else {
        starRating = `☆ 0`
    }
    // console.log(spotDetails)

    {
        spotReviews.find(e => {

            // console.log('e ===', e)
            if (e?.userId === currentUser?.id) {
                value = e.id
                // console.log('value === ', value)
                // console.log('currentUser === ', currentUser.id)

                // console.log('current user ===', currentUser)
            }
        })
    }

    useEffect(() => {

        dispatch(getAllSpotReviews(spotDetails.id))

    }, [dispatch, spotReviewNoOV.id, spotDetails.id])
    // console.log(spotReviewNoOV)
    useEffect(() => {
        dispatch(getOneSpot(spotDetails.id))
    }, [spotDetails.id, spotReviewNoOV, dispatch])

    // if (!spotReviews.length) return;

    // {spotReviews.filter(review => {
    //     {console.log('review.userId ===', review.userId)
    //     console.log('currentUser.id ====', currentUser.id)}
    //     if (review?.userId !== currentUser?.id)

    if (currentUser) spotReviews.find(review => review.userId === currentUser.id) ? reviewed = true : reviewed = false;

    return spotReviews && (
        <div className='main-review-div'>
            <div className='spot-reviews' /*style={{ border: '1px solid black' }}*/ >
                {/* <h3 className='name-of-spot'>  {spotDetails.name} </h3> */}
                <h4 className='list-of-reviews'>{starRating} · {spotDetails.numReviews} Review(s)</h4>
                <ul className='list-of-reviews'>
                    {spotReviews.map((ele) => (
                        <div className='li-li-userInfo' key={ele}>
                            <i id='profile-review' className="fas fa-user-circle" />
                            <span id='first-last-name'>
                                {ele.User.firstName} {ele.User.lastName}
                            </span>
                            <li>
                                <span className='li-li' >
                                    "{ele.review}" ★  {ele.stars}
                                </span>
                            </li>
                            {(currentUser && (currentUser.id === ele.User.id) && <button className='review-buttons' id='delete-review-button' onClick={async (e) => {
                                e.preventDefault()

                                dispatch(deleteReviewThunk(ele.id))

                            }}>Delete Review</button>)}
                        </div>
                    ))}
                </ul>
                {(!reviewed) && (currentUser?.id !== spotDetails?.ownerId) &&
                    <div>
                        <CreateReview key={spotDetails.id} spotDetails={spotDetails} />
                    </div>
                }
            </div>
        </div>
    )

}


export default GetReviewsBySpot;
