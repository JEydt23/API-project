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
    console.log(spotReviewNoOV)
    console.log(spotDetails)

    // CODE FOR WHEN NOT LOGGED IN AS RIGHT USER
    let value;
    {
        spotReviews.find(e => {

            if (e?.userId === currentUser?.id) {
                value = e.id
                // console.log(value)
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


    return spotReviews && (

        <div className='spot-reviews' style={{ border: '5px solid black' }}>


            <CreateReview key={spotDetails.id} spotDetails={spotDetails} />
            <h3 style={{ border: '5px solid green' }}>  {spotDetails.name} </h3>
            <p style={{ border: '5px solid red' }}>★ {spotDetails.avgStarRating} · {spotDetails.numReviews} Reviews</p>
            <div className='ul'>
                <ul>
                    {spotReviews.map((ele) => (
                        <li key={ele.id}>"{ele.review}" - {ele.User.firstName} {ele.User.lastName}
                            {(currentUser && (currentUser.id === ele.User.id) && <button class='review-buttons' id='delete-review-button' onClick={async (e) => {
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
