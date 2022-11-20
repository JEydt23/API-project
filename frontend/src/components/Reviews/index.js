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
    console.log(spotDetails)

    {
        spotReviews.find(e => {

            console.log('e ===', e)
            if (e?.userId === currentUser?.id) {
                value = e.id
                // console.log('value === ', value)
                console.log('currentUser === ', currentUser.id)

                console.log('current user ===', currentUser)
            }
        })
    }

    useEffect(() => {

        dispatch(getAllSpotReviews(spotDetails.id))

    }, [dispatch, spotDetails.id])

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
        <div>
            <div>
                {(!reviewed) && (currentUser.id !== spotDetails.ownerId ) &&
                    <div>
                        <CreateReview key={spotDetails.id} spotDetails={spotDetails} />
                    </div>
                }
                {/* <h3 className='name-of-spot'>  {spotDetails.name} </h3> */}
                <p > ★ {spotDetails.avgStarRating} · {spotDetails.numReviews} Reviews</p>
                <ul >
                    {spotReviews.map((ele) => (
                        <li  key={ele.id}>"{ele.review}" - {ele.User.firstName} {ele.User.lastName}
                            {(currentUser && (currentUser.id === ele.User.id) && <button  id='delete-review-button' onClick={async (e) => {
                                e.preventDefault()
                                await dispatch(deleteReviewThunk(value))

                                await history.push(`/spots/${spotDetails.id}`)
                            }}>Delete Review</button>)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}


export default GetReviewsBySpot;
