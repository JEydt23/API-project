import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotReviews } from '../../store/reviews';
import CreateReview from '../CreateReview';
import { deleteReviewThunk } from '../../store/reviews';
import { useHistory, useParams } from 'react-router-dom';

const GetReviewsBySpot = ({ spotDetails }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spotReviews = useSelector(state => Object.values(state.review.allSpots));
    const currentUser = useSelector(state => state.session.user);
    let value;
    spotReviews.find(e => {

        if (e.userId == currentUser.id){
            value = e.id
            console.log(value)
        }
    })

    useEffect(() => {
        dispatch(getAllSpotReviews(spotDetails.id))

    }, [dispatch, spotDetails.id])


    // if (!spotReviews.length) return;

    return spotReviews && (

        <div>
            <div className='spot-reviews' style={{ border: '800px solid black' }} >

                <CreateReview key={spotDetails.id} spotDetails={spotDetails} />
                <h3>  {spotDetails.name} ★ {spotDetails.avgStarRating}</h3>
                <ul>
                    {spotReviews.map((ele) => (
                        <li key={ele.id}>"{ele.review}" - {ele.User.firstName} {ele.User.lastName}
                            {(currentUser.id === ele.User.id &&
                                <button id='delete-review-button' onClick={async (e) => {
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
